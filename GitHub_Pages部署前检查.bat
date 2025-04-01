@echo off
echo ======================================
echo GitHub Pages 部署前检查工具
echo ======================================
echo.

echo 正在检查关键文件...
echo.

REM 检查.nojekyll文件
if exist ".nojekyll" (
    echo [√] .nojekyll文件已存在
) else (
    echo [!] 警告：.nojekyll文件不存在
    echo     正在创建.nojekyll文件...
    type nul > .nojekyll
    echo     .nojekyll文件已创建
)

REM 检查assets目录和style.scss文件
if not exist "assets\css" (
    echo [!] 警告：assets\css目录不存在
    echo     正在创建assets\css目录...
    mkdir "assets\css"
    echo     assets\css目录已创建
) else (
    echo [√] assets\css目录已存在
)

if not exist "assets\css\style.scss" (
    echo [!] 警告：assets\css\style.scss文件不存在
    echo     正在创建assets\css\style.scss文件...
    echo /*> "assets\css\style.scss"
    echo 这是一个空的样式文件，用于解决GitHub Pages的Jekyll处理问题>> "assets\css\style.scss"
    echo 您的实际样式文件位于css/style.css>> "assets\css\style.scss"
    echo */>> "assets\css\style.scss"
    echo.>> "assets\css\style.scss"
    echo @import "{{ site.theme }}";>> "assets\css\style.scss"
    echo     assets\css\style.scss文件已创建
) else (
    echo [√] assets\css\style.scss文件已存在
)

REM 检查index.html文件
if exist "index.html" (
    echo [√] index.html文件已存在
) else (
    echo [!] 警告：index.html文件不存在，这可能会导致404错误
)

echo.
echo 检查完成！请确保上传到GitHub时包含以上所有文件。
echo 特别注意：上传时请选择"所有文件"而不是"所有文档"，
echo 因为.nojekyll是以点开头的隐藏文件，某些系统可能默认不显示。
echo.
echo 按任意键退出...
pause > nul