export default definePreset({
    name: 'hybridly-breeze',
    options: {},
    handler: async () => {
        await applyNestedPreset({ preset: 'hybridly/preset' });

        await installNpmDependencies();

        await extractTemplates({
            title: 'extract templates',
            from: 'base',
        });

        await editFiles({
            title: 'change db driver to sqlite',
            files: '.env',
            operations: [
                {
                    type: 'update-content',
                    update: (content) =>
                        content.replace(
                            'DB_CONNECTION=mysql',
                            'DB_CONNECTION=sqlite'
                        ),
                },
                {
                    type: 'remove-line',
                    match: /DB_HOST/,
                    count: 5,
                },
            ],
        });

        await setupFortify();
    },
});

const installNpmDependencies = async () => {
    await installPackages({
        title: 'add npm dependencies',
        for: 'node',
        dev: false,
        packages: ['@heroicons/vue', '@vueuse/core'],
    });

    await installPackages({
        title: 'add npm dev dependencies',
        for: 'node',
        dev: true,
        packages: ['prettier-plugin-tailwindcss', 'color'],
    });
};

const setupFortify = async () => {
    await installPackages({
        title: 'install fortify',
        for: 'php',
        packages: ['laravel/fortify'],
    });

    await executeCommand({
        title: "publish fortify's resources",
        command: 'php',
        arguments: [
            'artisan',
            'vendor:publish',
            '--provider=Laravel\\Fortify\\FortifyServiceProvider',
        ],
    });

    await editFiles({
        title: 'add fortify service provider',
        files: 'config/app.php',
        operations: {
            type: 'add-line',
            match: /App\\Providers\\RouteServiceProvider::class,/,
            position: 'after',
            lines: ['App\\Providers\\FortifyServiceProvider::class,'],
        },
    });

    await editFiles({
        title: 'register fortify auth views',
        files: 'app/Providers/FortifyServiceProvider.php',
        operations: {
            type: 'add-line',
            match: /Fortify::createUsersUsing\(CreateNewUser::class\);/,
            position: 'before',
            lines: [
                "Fortify::loginView(fn () => hybridly('auth.login'));",
                "Fortify::registerView(fn () => hybridly('auth.register'));",
                "Fortify::verifyEmailView(fn () => hybridly('auth.verify-email'));",
                "Fortify::confirmPasswordView(fn () => hybridly('auth.confirm-password'));",
                "Fortify::twoFactorChallengeView(fn () => hybridly('auth.two-factor-challenge'));",
                "Fortify::requestPasswordResetLinkView(fn () => hybridly('auth.forgot-password'));",
                "Fortify::resetPasswordView(fn () => hybridly('reset-password', [",
                "    'email' => request()->query('email'),",
                "    'token' => request()->route('token')",
                ']));',
            ],
        },
    });

    await editFiles({
        title: 'update user model',
        files: 'app/Models/User.php',
        operations: [
            {
                type: 'add-line',
                match: /use Laravel\\Sanctum\\HasApiTokens;/,
                position: 'after',
                lines: ['use Laravel\\Fortify\\TwoFactorAuthenticatable;'],
            },
            {
                type: 'update-content',
                update: (content) =>
                    content.replace(
                        'use HasApiTokens, HasFactory, Notifiable;',
                        'use HasApiTokens, HasFactory, Notifiable, TwoFactorAuthenticatable;'
                    ),
            },
        ],
    });

    await editFiles({
        title: 'setup hybridly shared properties',
        files: 'app/Http/Middleware/HandleHybridRequests.php',
        operations: [
            {
                type: 'remove-line',
                match: /public function share\(\): SharedData/,
                count: 7,
                start: 1,
            },
            {
                type: 'add-line',
                match: /public function share\(\): SharedData/,
                position: 'after',
                lines: [
                    '{',
                    '    return SharedData::from([',
                    "        'security' => SecurityData::from([",
                    "            'user' => UserData::optional(auth()->user()),",
                    '        ]),',
                    "        'status' => session('status') // used by fortify",
                    '    ]);',
                    '}',
                ],
            },
        ],
    });
};
