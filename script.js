document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name-input');
    const bioInput = document.getElementById('bio-input');
    const nameDisplay = document.getElementById('name-display');
    const bioDisplay = document.getElementById('bio-display');
    const saveBtn = document.getElementById('save-btn');
    const avatarInput = document.getElementById('avatar-input');
    const avatar = document.getElementById('avatar');
    
    let isEditing = true;
    
    function toggleEditMode() {
        if (isEditing) {
            nameDisplay.textContent = nameInput.value || '未填写';
            bioDisplay.textContent = bioInput.value || '未填写';
            
            nameInput.classList.add('active');
            bioInput.classList.add('active');
            nameDisplay.classList.add('active');
            bioDisplay.classList.add('active');
            
            saveBtn.textContent = '编辑';
        } else {
            nameInput.classList.remove('active');
            bioInput.classList.remove('active');
            nameDisplay.classList.remove('active');
            bioDisplay.classList.remove('active');
            
            saveBtn.textContent = '保存';
        }
        
        isEditing = !isEditing;
    }
    
    saveBtn.addEventListener('click', toggleEditMode);
    
    avatarInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatar.src = e.target.result;
                    
                    avatar.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        avatar.style.animation = '';
                    }, 500);
                };
                
                reader.readAsDataURL(file);
            } else {
                alert('请选择有效的图片文件！');
                avatarInput.value = '';
            }
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (nameInput.value.length > 20) {
            nameInput.value = nameInput.value.slice(0, 20);
        }
    });
    
    bioInput.addEventListener('input', function() {
        if (bioInput.value.length > 100) {
            bioInput.value = bioInput.value.slice(0, 100);
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('个人信息卡片页面已加载完成！');
});