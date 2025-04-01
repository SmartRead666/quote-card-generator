document.addEventListener('DOMContentLoaded', function() {
    'use strict'; // 使用严格模式避免一些常见错误
    console.log('DOM完全加载，初始化应用...');
    // 获取DOM元素
    const quoteInput = document.getElementById('quote-input');
    const quoteText = document.getElementById('quote-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const card = document.getElementById('card');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const textColorPicker = document.getElementById('text-color');
    const solidColorPicker = document.getElementById('solid-color');
    const gradientColor1 = document.getElementById('gradient-color-1');
    const gradientColor2 = document.getElementById('gradient-color-2');
    const gradientDirection = document.getElementById('gradient-direction');
    const bgImageUpload = document.getElementById('bg-image-upload');
    const uploadFileName = document.getElementById('upload-file-name');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 当前背景类型
    let currentBgType = 'solid';
    let customBgImage = null;
    
    // 创建通知元素
    function showNotification(message, isError = false) {
        // 移除现有通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'notification' + (isError ? ' error' : '');
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 触发重排以应用动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 自动移除通知
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 创建加载指示器
    function createLoadingIndicator(message = '处理中...') {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;
        document.body.appendChild(loadingIndicator);
        return loadingIndicator;
    }
    
    // 标签切换功能
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有active类
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 添加active类到当前选中的标签
            this.classList.add('active');
            const tabContent = document.getElementById(`${tabId}-tab`);
            
            if (tabContent) {
                tabContent.classList.add('active');
                
                // 更新当前背景类型
                currentBgType = tabId;
                
                // 应用相应的背景
                applyBackground();
            }
        });
    });
    
    // 字体选择功能
    fontFamilySelect.addEventListener('change', function() {
        quoteText.style.fontFamily = this.value;
    });
    
    // 应用背景函数
    function applyBackground() {
        // 移除所有背景类
        card.className = 'card';
        
        // 重置背景样式
        card.style.backgroundColor = '';
        card.style.backgroundImage = '';
        card.style.backgroundSize = '';
        card.style.backgroundPosition = '';
        
        switch(currentBgType) {
            case 'solid':
                card.classList.add('solid-bg');
                card.style.backgroundColor = solidColorPicker.value;
                card.style.backgroundImage = 'none';
                break;
                
            case 'gradient':
                card.classList.add('gradient-bg');
                if (gradientDirection.value === 'circle') {
                    card.style.backgroundImage = `radial-gradient(circle, ${gradientColor1.value}, ${gradientColor2.value})`;
                } else {
                    card.style.backgroundImage = `linear-gradient(${gradientDirection.value}, ${gradientColor1.value}, ${gradientColor2.value})`;
                }
                break;
                
            case 'image':
                card.classList.add('custom-image-bg');
                if (customBgImage) {
                    card.style.backgroundImage = `url(${customBgImage})`;
                    card.style.backgroundSize = 'cover';
                    card.style.backgroundPosition = 'center';
                } else {
                    // 使用默认背景图片
                    card.classList.add('bg1');
                }
                break;
                
            default:
                card.classList.add('bg1');
                break;
        }
    }
    
    // 纯色背景选择功能
    solidColorPicker.addEventListener('input', function() {
        if (currentBgType === 'solid') {
            applyBackground();
        }
    });
    
    // 渐变背景功能
    [gradientColor1, gradientColor2, gradientDirection].forEach(el => {
        el.addEventListener('input', function() {
            if (currentBgType === 'gradient') {
                applyBackground();
            }
        });
    });
    
    // 图片上传功能
    bgImageUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            uploadFileName.textContent = file.name;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                customBgImage = e.target.result;
                if (currentBgType === 'image') {
                    applyBackground();
                }
                showNotification('背景图片已上传');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 字体大小调整功能
    fontSizeSlider.addEventListener('input', function() {
        const size = this.value;
        fontSizeValue.textContent = `${size}px`;
        quoteText.style.fontSize = `${size}px`;
    });
    
    // 文字颜色调整功能
    textColorPicker.addEventListener('input', function() {
        quoteText.style.color = this.value;
    });
    
    // 生成卡片功能
    generateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const quoteContent = quoteInput.value.trim();
        
        if (quoteContent === '') {
            showNotification('请输入金句内容', true);
            return;
        }
        
        // 更新卡片文本
        quoteText.textContent = quoteContent;
        
        // 启用下载和分享按钮
        downloadBtn.disabled = false;
        shareBtn.disabled = false;
        
        // 确保背景已应用
        applyBackground();
        
        showNotification('卡片已生成');
    });
    
    // 下载卡片功能
    downloadBtn.addEventListener('click', function() {
        const loadingIndicator = createLoadingIndicator('正在生成图片...');
        
        // 保存原始样式
        const originalAnimation = card.style.animation;
        const originalTransform = card.style.transform;
        const originalPosition = card.style.position;
        const originalZIndex = card.style.zIndex;
        
        // 暂时修改样式以确保正确渲染
        card.style.animation = 'none';
        card.style.transform = 'none';
        card.style.position = 'relative';
        card.style.zIndex = '1';
        
        // 确保卡片内容可见
        const originalVisibility = [];
        const cardChildren = card.querySelectorAll('*');
        cardChildren.forEach(child => {
            originalVisibility.push({
                element: child,
                visibility: child.style.visibility,
                display: child.style.display
            });
            child.style.visibility = 'visible';
            child.style.display = child.style.display === 'none' ? 'block' : child.style.display;
        });
        
        setTimeout(() => {
            html2canvas(card, {
                allowTaint: true,
                useCORS: true,
                scale: 2, // 提高图片质量
                backgroundColor: null, // 保持背景透明
                logging: true, // 启用日志以便调试
                imageTimeout: 0, // 禁用图像超时
                onclone: function(clonedDoc) {
                    // 确保克隆的DOM元素样式正确
                    const clonedCard = clonedDoc.getElementById('card');
                    if (clonedCard) {
                        clonedCard.style.width = card.offsetWidth + 'px';
                        clonedCard.style.height = card.offsetHeight + 'px';
                    }
                }
            }).then(canvas => {
                try {
                    // 恢复原始样式
                    card.style.animation = originalAnimation;
                    card.style.transform = originalTransform;
                    card.style.position = originalPosition;
                    card.style.zIndex = originalZIndex;
                    
                    // 恢复子元素原始可见性
                    originalVisibility.forEach(item => {
                        item.element.style.visibility = item.visibility;
                        item.element.style.display = item.display;
                    });
                    
                    // 创建下载链接
                    const imgData = canvas.toDataURL('image/png');
                    if (!imgData || imgData === 'data:,') {
                        throw new Error('生成的图片数据为空');
                    }
                    
                    const link = document.createElement('a');
                    link.download = '金句卡片.png';
                    link.href = imgData;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    
                    // 触发点击
                    setTimeout(() => {
                        link.click();
                        document.body.removeChild(link);
                        loadingIndicator.remove();
                        showNotification('卡片已下载');
                    }, 100);
                } catch (err) {
                    console.error('处理图片数据失败:', err);
                    loadingIndicator.remove();
                    showNotification('处理图片数据失败，请重试', true);
                }
            }).catch(error => {
                console.error('生成图片失败:', error);
                loadingIndicator.remove();
                showNotification('生成图片失败，请重试', true);
                
                // 恢复原始样式
                card.style.animation = originalAnimation;
                card.style.transform = originalTransform;
                card.style.position = originalPosition;
                card.style.zIndex = originalZIndex;
                
                // 恢复子元素原始可见性
                originalVisibility.forEach(item => {
                    item.element.style.visibility = item.visibility;
                    item.element.style.display = item.display;
                });
            });
        }, 300); // 增加延迟确保DOM已完全渲染
    });
    
    // 分享功能
    shareBtn.addEventListener('click', function() {
        const loadingIndicator = createLoadingIndicator('准备分享...');
        
        // 保存原始样式
        const originalAnimation = card.style.animation;
        const originalTransform = card.style.transform;
        const originalPosition = card.style.position;
        const originalZIndex = card.style.zIndex;
        
        // 暂时修改样式以确保正确渲染
        card.style.animation = 'none';
        card.style.transform = 'none';
        card.style.position = 'relative';
        card.style.zIndex = '1';
        
        // 确保卡片内容可见
        const originalVisibility = [];
        const cardChildren = card.querySelectorAll('*');
        cardChildren.forEach(child => {
            originalVisibility.push({
                element: child,
                visibility: child.style.visibility,
                display: child.style.display
            });
            child.style.visibility = 'visible';
            child.style.display = child.style.display === 'none' ? 'block' : child.style.display;
        });
        
        setTimeout(() => {
            html2canvas(card, {
                allowTaint: true,
                useCORS: true,
                scale: 2,
                backgroundColor: null,
                logging: true, // 启用日志以便调试
                imageTimeout: 0, // 禁用图像超时
                onclone: function(clonedDoc) {
                    // 确保克隆的DOM元素样式正确
                    const clonedCard = clonedDoc.getElementById('card');
                    if (clonedCard) {
                        clonedCard.style.width = card.offsetWidth + 'px';
                        clonedCard.style.height = card.offsetHeight + 'px';
                    }
                }
            }).then(canvas => {
                try {
                    // 恢复原始样式
                    card.style.animation = originalAnimation;
                    card.style.transform = originalTransform;
                    card.style.position = originalPosition;
                    card.style.zIndex = originalZIndex;
                    
                    // 恢复子元素原始可见性
                    originalVisibility.forEach(item => {
                        item.element.style.visibility = item.visibility;
                        item.element.style.display = item.display;
                    });
                    
                    canvas.toBlob(function(blob) {
                        if (!blob) {
                            throw new Error('生成的图片数据为空');
                        }
                        
                        loadingIndicator.remove();
                        
                        if (navigator.share && blob) {
                            // 使用Web Share API分享
                            const file = new File([blob], '金句卡片.png', { type: 'image/png' });
                            navigator.share({
                                title: '分享金句卡片',
                                files: [file]
                            }).then(() => {
                                showNotification('分享成功');
                            }).catch(error => {
                                if (error.name !== 'AbortError') {
                                    showNotification('分享失败，请手动保存图片', true);
                                }
                            });
                        } else {
                            // 回退到下载
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.download = '金句卡片.png';
                            link.href = url;
                            link.style.display = 'none';
                            document.body.appendChild(link);
                            
                            setTimeout(() => {
                                link.click();
                                document.body.removeChild(link);
                                URL.revokeObjectURL(url);
                                showNotification('您的浏览器不支持分享功能，已保存图片');
                            }, 100);
                        }
                    });
                } catch (err) {
                    console.error('处理图片数据失败:', err);
                    loadingIndicator.remove();
                    showNotification('处理图片数据失败，请重试', true);
                }
            }).catch(error => {
                console.error('生成分享图片失败:', error);
                loadingIndicator.remove();
                showNotification('生成图片失败，请重试', true);
                
                // 恢复原始样式
                card.style.animation = originalAnimation;
                card.style.transform = originalTransform;
                card.style.position = originalPosition;
                card.style.zIndex = originalZIndex;
                
                // 恢复子元素原始可见性
                originalVisibility.forEach(item => {
                    item.element.style.visibility = item.visibility;
                    item.element.style.display = item.display;
                });
            });
        }, 300); // 增加延迟确保DOM已完全渲染
    });
    
    // 初始化
    fontSizeValue.textContent = `${fontSizeSlider.value}px`;
    
    // 初始化默认背景
    applyBackground();
    
    // 初始化默认字体
    quoteText.style.fontFamily = fontFamilySelect.value;
});