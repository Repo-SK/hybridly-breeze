export default definePreset({
    name: 'hybridly-breeze',
    options: {},
    handler: async () => {
        await applyNestedPreset({ preset: 'hybridly/preset', args: ['--no-pest'] });

        await installNpmDependencies();

        await extractTemplates({
            title: 'extract templates',
            from: 'base',
        });

        await installComposerDependencies();

        await setupFortify();
    },
});

const installNpmDependencies = async () => {
    await installPackages({
        title: 'add npm dependencies',
        for: 'node',
        dev: false,
        packages: ['@heroicons/vue', '@vueuse/core', 'axios'],
    });

    await installPackages({
        title: 'add npm dev dependencies',
        for: 'node',
        dev: true,
        packages: ['prettier-plugin-tailwindcss', 'color'],
    });
};

const installComposerDependencies = async () => {
    await installPackages({
        title: 'install composer dependencies',
        for: 'php',
        packages: ['jenssegers/agent'],
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
                "Fortify::loginView(fn () => hybridly('Auth.Login', [",
                "    'canResetPassword' => app('router')->has('password.request'),",
                "    'status' => session('status'),",
                ']));',
                "Fortify::registerView(fn () => hybridly('Auth.Register'));",
                "Fortify::verifyEmailView(fn () => hybridly('Auth.VerifyEmail', [",
                "    'status' => session('status'),",
                ']));',
                "Fortify::confirmPasswordView(fn () => hybridly('Auth.ConfirmPassword'));",
                "Fortify::twoFactorChallengeView(fn () => hybridly('Auth.TwoFactorChallenge'));",
                "Fortify::requestPasswordResetLinkView(fn () => hybridly('Auth.ForgotPassword', [",
                "    'status' => session('status'),",
                ']));',
                "Fortify::resetPasswordView(fn () => hybridly('reset-password', [",
                "    'email' => request()->input('email'),",
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

    await editFiles({
        title: 'update default home route in fortify',
        files: 'config/fortify.php',
        operations: {
            type: 'update-content',
            update: (content) =>
                content.replace(
                    "'home' => '/home',",
                    "'home' => '/dashboard',"
                ),
        },
    });

    await editFiles({
        title: 'update default home route in route service provider',
        files: 'app/Providers/RouteServiceProvider.php',
        operations: {
            type: 'update-content',
            update: (content) =>
                content.replace(
                    "public const HOME = '/home';",
                    "public const HOME = '/dashboard';"
                ),
        },
    });
};
