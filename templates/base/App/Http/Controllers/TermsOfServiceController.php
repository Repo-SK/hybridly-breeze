<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class TermsOfServiceController extends Controller
{
    /**
     * Show the terms of service for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Hybridly\Hybridly|\Hybridly\View\Factory
     */
    public function show(Request $request)
    {
        return hybridly('TermsOfService', [
            'terms' => Str::markdown(
                File::get(
                    resource_path('markdown/terms.md')
                )
            ),
        ]);
    }
}
