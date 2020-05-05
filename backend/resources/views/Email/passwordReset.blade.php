@component('mail::message')
# Change password Request

Example mail, send change user's password,
First you have click below to change the password

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token])
Reset your password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
