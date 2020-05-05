<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use App\User;

class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTaleRow($request)->count()>0 ? $this->changePassword($request)
                                                                   : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTaleRow($request)
    {
        return User::where('email','=',$request->email);
    }

    private function changePassword($request)
    {
        $user = User::where('email','=',$request->email)->first();
        $user->password=$request->password;
        $user->save();
        return response()->json([
            'data'=>'Password sueccessfull changed!'
        ], Response::HTTP_CREATED);
    }

    private function tokenNotFoundResponse()
    {
        return response()->json([
            'error'=>'Token or Email is incorrect'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
