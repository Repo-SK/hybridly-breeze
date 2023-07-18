<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountSecurityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return hybridly('account/security/index', [
          'twofa_enabled' => !!auth()->user()->two_factor_recovery_codes,
          'twofa_confirmed' => !!auth()->user()->two_factor_confirmed_at,
        ]);
    }
}
