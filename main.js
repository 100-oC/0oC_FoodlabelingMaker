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
// 完成描画領域
const Overlay           =document.getElementById("resultOverlay");
const ResultImage       =document.getElementById("resultImage");
const ImageCancel       =document.getElementById("imageCancel");

// キャンバス関係サイズの初期値
const CanvasSpace       =10;    //　描画開始地点までの距離
const CanvasSizeX       =600;
const CanvasSizeY       =400;
const ContentsFontSize  =24;    // 「名称」など見出しのフォントサイズ

// タイトル入力
TitleInput.addEventListener("input",function(){Draw(ImageScale.value);});
// 内容量入力
ContentsSizeInput.addEventListener("input",function(){Draw(ImageScale.value);});
// 製造者入力
UserNameInput.addEventListener("input",function(){Draw(ImageScale.value);});
// 原材料名
IngredientsList.addEventListener("input",function(){Draw(ImageScale.value);});
// 原材料名を改行
function DrawIngredientsList()
{
    // 改行で区切る
    const lines =IngredientsList.value.split("\n");
    ingredientsString=lines.join("、");

    // 文字列を改行編集
    const string= StringBr(ingredientsString);
    for(let i=0;i<string.length;i++)
    {
        Ctx.fillText(string[i], 
            CanvasSpace + 125*ImageScale.value, 
            CanvasSpace + (85+ContentsFontSize*i)*ImageScale.value);
    }
}

// 文字列を一定の流さで改行
function StringBr(string)
{
    const lines=[];
    let line="";
    for(const char of string)
    {
        line+=char;

        // 改行を入れる
        if(Ctx.measureText(line).width>450*ImageScale.value)
        {
            lines.push(line);
            line="";
        }
    }

    if (line !== "") 
    {
        lines.push(line);
    }  

    return lines;
}

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
     Ctx.fillText(TitleInput.value, 
        CanvasSpace + 125*ImageScale.value, CanvasSpace + 35*ImageScale.value);
    DrawLine(
        CanvasSpace, CanvasSpace + 50 * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + 50*scale);

    Ctx.fillText("原材料名", 
        CanvasSpace + 10*scale, CanvasSpace + 85*scale);
    DrawIngredientsList();
    DrawLine(
        CanvasSpace, CanvasSpace + (100 + 200) * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + (100 + 200)*scale);

    Ctx.fillText(" 内 容 量", 
        CanvasSpace + 10*scale, CanvasSpace + (133 + 200)*scale);
    Ctx.fillText(ContentsSizeInput.value, 
        CanvasSpace + 125*scale, CanvasSpace + (133 + 200)*scale);
    DrawLine(
        CanvasSpace, CanvasSpace + (150 + 200) * scale,
        CanvasSpace + CanvasSizeX * scale, CanvasSpace + (150 + 200)*scale);

    Ctx.fillText(" 製 造 者", 
        CanvasSpace + 10*scale, CanvasSpace + (185 + 200)*scale);
    Ctx.fillText(UserNameInput.value, 
        CanvasSpace + 125*scale, CanvasSpace + (185 + 200)*scale);

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
GenerateButton.addEventListener("click",function()
{
    // 画像を書き出し
    Overlay.style.display = "flex";
    const image = Canvas.toDataURL("image/png");
    ResultImage.src = image;
});

// オーバーレイ表示中のボタンを押した際のイベント
ImageCancel.addEventListener("click",function()
{
    // オーバーレイを消す
    Overlay.style.display = "none";
})