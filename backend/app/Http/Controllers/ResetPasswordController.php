<?php

namespace App\Http\Controllers;


use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\User;
use App\Mail\ResetPasswordMail;

use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        if(!$this->validateEmail($request->email)){
            return $this->fieldResponse();
        }
        $this->send($request->email);

        return $this->successResponse();
    }

    private function validateEmail($email){
        return !!User::where('email','=',$email)->first();
    }

    private function fieldResponse(){
        return response()->json([
            "error"=>"This email does not found"
        ],Response::HTTP_NOT_FOUND);
    }

    private function successResponse(){
        return response()->json([
            "data"=>"Reset email is send successfully, please check your inbox. "
        ],Response::HTTP_OK);
    }

    public function send($email){
        $token  = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email){
        $token = Str::random(60);
        $this->saveToken($token,$email);

        return $token;
    }

    public function saveToken($token,$email){
        /*
        DB::table('password_resets')->insert([
            'email'=>$email,
            'token'=>$token,
        ]);
        */
    }

}
