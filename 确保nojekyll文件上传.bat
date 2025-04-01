@echo off
echo 正在检查.nojekyll文件...

if exist ".nojekyll" (
    echo .nojekyll文件已存在
) else (
    echo 创建.nojekyll文件...
    type nul > .nojekyll
    echo .nojekyll文件已创建
)

echo.
echo 请确保上传到GitHub时包含此文件
echo 上传文件时，请特别注意选择"所有文件"而不是"所有文档"
echo 因为.nojekyll是以点开头的隐藏文件，某些系统可能默认不显示
echo.
echo 如果使用Git命令行上传，请确保.nojekyll文件已被Git跟踪：
echo git add .nojekyll
echo git commit -m "添加.nojekyll文件以禁用Jekyll处理"
echo git push
echo.
echo 按任意键退出...
pause > nul