<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'nameSei' => 'required|string|max:255',
            'nameMei' => 'required|string|max:255',
            'kanaSei' => 'required|string|max:255',
            'kanaMei' => 'required|string|max:255',
            'mail' => 'required|email',
            'sex' => 'required|string',
            'assort' => 'required|string',
            'content' => 'required|string|max:300',
            'know' => 'array',
        ]);

        $toAdmin = config('mail.from.address');

        // 管理者宛
        Mail::raw($this->makeAdminMessage($data), function ($message) use ($toAdmin) {
            $message->to($toAdmin)
                ->subject('【Laravel】お問い合わせがありました');
        });

        // ユーザー宛
        Mail::raw($this->makeUserMessage($data), function ($message) use ($data) {
            $message->to($data['mail'])
                ->subject('【Laravel】お問い合わせありがとうございます');
        });

        return response()->json(['message' => '送信成功'], 200);
    }

    private function makeAdminMessage(array $data): string
    {
        $knowText = implode('，', $data['know'] ?? []);

        return <<<EOT
お問い合わせ担当各位

{$data['nameSei']} {$data['nameMei']} 様よりお問い合わせを頂きました。
ご対応をよろしくお願いします。

━━━━━━━━━━━━━━━━━━━━━━━━
お問い合わせ内容
━━━━━━━━━━━━━━━━━━━━━━━━
■お名前: {$data['nameSei']} {$data['nameMei']}
■フリガナ: {$data['kanaSei']} {$data['kanaMei']}
■メールアドレス: {$data['mail']}
■性別: {$data['sex']}
■お問い合わせ種別: {$data['assort']}
■お問い合わせ内容:
{$data['content']}
■当社をどこで知りましたか:
{$knowText}

------------
以上
EOT;
    }

    private function makeUserMessage(array $data): string
    {
        $knowText = implode('，', $data['know'] ?? []);

        return <<<EOT
この度はお問い合わせありがとうございます。
お問い合わせ内容により、返信にはお時間を頂く場合もありますがご了承ください。

━━━━━━━━━━━━━━━━━━━━━━━━
以下の内容でメールを受け付けました。
━━━━━━━━━━━━━━━━━━━━━━━━
■お名前: {$data['nameSei']} {$data['nameMei']}
■フリガナ: {$data['kanaSei']} {$data['kanaMei']}
■メールアドレス: {$data['mail']}
■性別: {$data['sex']}
■お問い合わせ種別: {$data['assort']}
■お問い合わせ内容:
{$data['content']}
■当社をどこで知りましたか:
{$knowText}

----------------------------------------
react_test
【お問い合わせ専用ダイヤル】 03-0000-0000
※受付時間 9:00～18:00（月～金）
----------------------------------------
EOT;
    }
}
