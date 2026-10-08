// 入力欄を取得
const TitleInput        =document.getElementById("title");
const IngredientsList   =document.getElementById("ingredients");
const ContentsSizeInput =document.getElementById("contentsSize");
const UserNameInput     =document.getElementById("userName");
// 画像倍率
const ImageScale        =document.getElementById("imageScale");
const ImageScaleText    =document.getElementById("scaleText");
// 発行ボタンを取得
const GenerateButton    =document.getElementById("generateButton");
// キャンバスを取得
const Canvas            =document.getElementById("preview");
const Ctx               =Canvas.getContext("2d");

// キャンバス関係サイズの初期値
const CanvasSpace       =10;    //　描画開始地点までの距離
const CanvasSizeX       =600;
const CanvasSizeY       =400;
const ContentsFontSize  =24;    // 「名称」など見出しのフォントサイズ

// 倍率の変更
Draw();
ImageScale.addEventListener("input", function() 
{
    scaleX=CanvasSizeX*ImageScale.value;
    scaleY=CanvasSizeY*ImageScale.value;
    ImageScaleText.textContent =scaleX + " × " + scaleY;

    Canvas.width = scaleX+CanvasSpace+CanvasSpace;
    Canvas.height = scaleY+CanvasSpace+CanvasSpace;

    // キャンバス内の倍率設定
    Draw(ImageScale.value);
});

// キャンバスへの描画：開始地点X,Y、幅、高さ
function Draw(scale=1.0)
{
    // 食品表示のベース
    Ctx.lineWidth = 3;
    Ctx.fillStyle = "white";
    Ctx.fillRect(CanvasSpace, CanvasSpace, 
        CanvasSizeX*scale, CanvasSizeY*scale);
    Ctx.strokeStyle = "black";
    Ctx.strokeRect(CanvasSpace, CanvasSpace, 
        CanvasSizeX*scale, CanvasSizeY*scale);

    // 文字入れ：表示文字列、座標X,Y
    Ctx.fillStyle = "black";
    Ctx.lineWidth = 2;
    fontSize=ContentsFontSize*scale;
    Ctx.font = fontSize + "px sans-serif";

    Ctx.fillText("名　　称", 
        CanvasSpace + 10*scale, CanvasSpace + 35*scale);
    DrawLine(
        CanvasSpace, CanvasSpace + 50 * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + 50*scale);

    Ctx.fillText("原材料名", 
        CanvasSpace + 10*scale, CanvasSpace + 85*scale);
    DrawLine(
        CanvasSpace, CanvasSpace + (100 + 200) * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + (100 + 200)*scale);

    Ctx.fillText(" 内 容 量", 
        CanvasSpace + 10*scale, CanvasSpace + (133 + 200)*scale);
    DrawLine(
        CanvasSpace, CanvasSpace + (150 + 200) * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + (150 + 200)*scale);

    Ctx.fillText(" 製 造 者", 
        CanvasSpace + 10*scale, CanvasSpace + (185 + 200)*scale);

    DrawLine(
        CanvasSpace + 115*scale, CanvasSpace,
        CanvasSpace + 115*scale, CanvasSpace + CanvasSizeY * scale);
}

// 線を引く
function DrawLine(StartX,StartY,EndX,EndY)
{
    Ctx.beginPath();
    Ctx.moveTo(StartX, StartY);
    Ctx.lineTo(EndX, EndY);
    Ctx.stroke();
}

// 発行ボタンが押された際のイベント
const resultImage = document.getElementById("resultImage");
GenerateButton.addEventListener("click",function()
{
    // console.log(TitleInput.value);

    // 画像を保存できるようにする
    // const image = Canvas.toDataURL("image/png");

    // // 一時リンクの作成
    // const Link = document.createElement("a");
    // Link.href = image;
    // // TODO:画像名を設定できるようにする
    // // TODO:現状ダウンロードページに飛ぶため画像のみ表示し、保存できるようにする
    // Link.download = "食品表示画像.png"

    // Link.click();

    const image = Canvas.toDataURL("image/png");

    resultImage.src = image;
});