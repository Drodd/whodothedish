// 游戏状态和DOM元素
let currentStory = 'start';
let isAnimating = false;
let animationTimeouts = [];

// DOM元素引用 - 将在DOMContentLoaded事件中初始化
let titleScreen, gameScreen, startGameBtn;
let backgroundImage1, backgroundImage2, storyTextElement, choicesContainer, continueArea, titleBackground;

// 添加移动端调试功能
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function debugLog(message) {
    // 只在控制台输出，不在页面上显示
    console.log(`[移动端调试] ${message}`);
}

// 背景图层状态管理
let currentBackgroundLayer = 1; // 当前活跃的背景图层 (1 或 2)

// 故事数据结构
const storyData = {
    "start": {
        text: `"如果明天早上还交不出份像样的报告，你就别在这里上班了！"
这是老板30分钟前的最终通牒，这句话仍在脑海里回荡。

"怎么了？不好吃么？"黛西问道，她是你的妻子。
10年前买房，从此踏上还贷之路。你知道必须独自扛下工作压力。

"不，挺好的，就是胃口不太好，最近太忙了。"
你看着桌上的牛肉咖喱，那是你最喜欢的菜，但现在没什么味觉。

"我吃好了。"你起身准备去书房。
"亲爱的，你是不是忘记了什么？"黛西问。

你回头看看餐桌。按约定，今天轮到你洗碗。
黛西眼神中带着疲惫，但那份报告就像悬在头顶的利剑。

你决定：`,
        background: "./img/1_After_dinner.png",
        choices: [
            { text: "去洗碗", next: "wash_dishes" },
            { text: "说明理由", next: "explain_reason" },
            { text: "蒙混过关", next: "play_dumb" },
            { text: "甜言蜜语", next: "sweet_talk" }
        ]
    },

    "wash_dishes": {
        text: `"好的，我去洗。"你叹气走向厨房。
黛西开始收拾餐桌。

你对洗碗流程不熟悉。十分钟过去才洗完三个盘子。
看着剩下的一堆碗筷，你感到绝望。
"如果明天早上还交不出份像样的报告..."老板的声音又响起。`,
        background: "./img/9_Washdish.png",
        choices: [
            { text: "继续", next: "ending1" }
        ]
    },

    "explain_reason": {
        text: `"黛西，我真的很抱歉，但我必须完成报告。老板说明天早上交不出来就可能丢工作。"

黛西表情瞬间严肃。"又是工作，永远都是工作！"
她把餐具重重放在桌上。

"我不是要推脱..."
"只是什么？只是你的工作比我重要？我有时觉得嫁的不是丈夫，而是工作机器。"

她转身背对着你。

你决定：`,
        background: "./img/2_Wife_unhappy.png",
        choices: [
            { text: "讲道理", next: "argue_logic" },
            { text: "道歉", next: "apologize" },
            { text: "去洗碗", next: "wash_dishes" }
        ]
    },

    "play_dumb": {
        text: `"呃...忘记什么了？"你装作茫然。
"最近工作太忙，脑子有点乱，你提醒我一下？"

"哦...是不是要收拾餐桌？我把餐具收到厨房去？"

黛西深吸一口气，努力控制情绪。
"亲爱的，我说的是洗碗。按照约定，今天轮到你洗碗。"

"洗碗？"你继续装糊涂。

"还需要我给你画个图解吗？"她语气带着讽刺。

你意识到伎俩败露了。

你决定：`,
        background: "./img/3_Play_foolish.png",
        choices: [
            { text: "说明理由", next: "explain_reason" },
            { text: "甜言蜜语", next: "sweet_talk" },
            { text: "去洗碗", next: "wash_dishes" }
        ]
    },

    "sweet_talk": {
        text: `"亲爱的，你今天真漂亮。我每天最期待的就是回家看到你的笑容。"

黛西挑眉，露出意味深长的微笑。
"哦，是吗？这么甜蜜的话，我都快被感动哭了。"

"如果可以，我愿意为你做任何事情。"

"任何事情？"黛西玩味地说，"比如说...洗碗？这算不算'任何事情'里面的一件？"

"当然，但是你知道我今天真的很忙..."

"哦，我懂了。'任何事情'的意思是'除了现在需要做的事情之外'。'最重要的人'的意思是'比工作重要一点点，但没有报告重要'。"

你感到前所未有的尴尬。

你决定：`,
        background: "./img/4_Sweet_words.png",
        choices: [
            { text: "说明理由", next: "explain_reason" },
            { text: "去洗碗", next: "wash_dishes" }
        ]
    },

    "apologize": {
        text: `"黛西，我错了。你说得对，我确实把工作看得太重，忽略了你的感受。"

黛西肩膀微微放松。

"我知道你也很累，你也为这个家付出很多，而我却总把你的付出当作理所当然。"

黛西慢慢转身，眼中泪水未干。"你真的这么想吗？"

"是的。我们结婚十年了，你一直支持我、理解我、包容我，而我却越来越不懂珍惜。"

黛西表情开始软化。"我不是要你不工作，只是希望你能多关心我一些。有时候我觉得很孤单。"

"不会的，永远不会的。你是我生命中最重要的人，没有你，我什么都不是。"

黛西在你怀里轻叹。

你决定：`,
        background: "./img/5_Apology.png",
        choices: [
            { text: "讲道理", next: "argue_logic" },
            { text: "去洗碗", next: "wash_together" }
        ]
    },

    "wash_together": {
        text: `"来，让我去洗碗吧。你今天也累了，休息一下。"

黛西惊讶地看着你。"你确定吗？报告不是很急吗？"

"报告可以等等，但你不能等。而且，我答应过要改变的。"

黛西眼中闪烁着感动的光芒。

你走向厨房开始洗碗。洗完第一个盘子时，听到脚步声。
"需要帮忙吗？"黛西出现在身边。

"我知道你能行，但我想和你一起。你洗，我擦，就像刚结婚时那样。"

你心中涌起暖流。

十五分钟后，所有碗盘洗完。厨房恢复整洁，关系重新找回温暖。`,
        background: "./img/9_Washdish.png",
        choices: [
            { text: "继续", next: "ending2" }
        ]
    },

    "argue_logic": {
        text: `"黛西，我理解你的感受，但你也要理解我的处境，我这样做都是为了我们的未来。"

黛西表情瞬间冷峻。"为了我们的未来？"

"是的，如果我丢了工作，房贷怎么办？我们的生活质量会下降。"

"所以你的意思是，牺牲我们现在的关系是值得的？"
黛西声音开始发抖，但不是委屈，而是愤怒。

"我是说我们要有长远眼光。现在辛苦一点，以后就会轻松一点。"

"长远眼光？"黛西冷笑，"我们结婚十年了，你每年都在说'现在辛苦一点，以后就会轻松一点'。十年了！我等了十年的'以后'！"

她眼中燃起愤怒火焰。

你决定：`,
        background: "./img/6_Wife_angry.png",
        choices: [
            { text: "道歉", next: "ignore_me" },
            { text: "让她静静", next: "computer_smashed" }
        ]
    },

    "computer_smashed": {
        text: `"算了，我不想和你吵。你静静，我去写报告。"

你转身离开，留下黛西一人。

你坐在电脑前敲击键盘："季度报告：市场分析与..."

书房门突然撞开，黛西冲进来手里拿着水杯。

"黛西，你干什么？我在工作..."

黛西把水杯重重砸向笔记本电脑。"砰！"水花四溅，电脑屏幕瞬间黑了。

"黛西！你疯了吗？！"
"是的，我疯了！"黛西眼中充满泪水和愤怒。

房门砰声关上，留下你面对湿漉漉的残骸。`,
        background: "./img/8_Working.png",
        choices: [
            { text: "继续", next: "ending3" }
        ]
    },

    "ignore_me": {
        text: `"黛西，等等，我错了。我不应该那样和你说话，我道歉。"

黛西停下脚步但没转身，肩膀微微颤抖。

"我知道你生气，但请相信我，我从来没有不重视你。"

"那你为什么总是选择工作？"她声音很轻，带着疲惫。

"因为我害怕失去这一切。房子、生活、你...我以为只要我努力工作，就能保护好一切。"

"但你知道吗？我宁愿和你住在小房子里，也不愿意一个人住在大房子里。"

她终于转身，眼中是深深的失望。

"我累了，我真的累了。"

黛西走向卧室，轻轻关上门。

你呆立在客厅中央。`,
        background: "./img/7_Close_door.png",
        choices: [
            { text: "继续", next: "ending1" }
        ]
    },

    "ending1": {
        text: `第二天早上，老板看了你的报告。

"这什么玩意？！数据不准确，分析不深入，结论也站不住脚！"

"对不起，我昨晚..."

"我不想听借口！收拾东西，你被解雇了！"

走出办公楼，你想起昨晚的争吵。
黛西今天早上没有和你说话，只是默默准备了早餐。

你掏出手机，想给她发消息道歉。
但你不知道该说什么。

也许一切都太晚了。`,
        background: "./img/End1_Fired.png",
        choices: [
            { text: "重新开始", next: "restart" }
        ]
    },

    "ending2": {
        text: `第二天早上，你很早就醒了。

你悄悄起床，没有吵醒黛西。

你打开电脑，开始写报告。
虽然只有短短几个小时，但你的思路出奇地清晰。

"亲爱的，你在做什么？"黛西穿着睡衣走过来。

"在写报告。昨晚和你在一起让我找回了灵感。"

"真的吗？"她惊讶地问。

"是的。我意识到，一个人如果连自己最爱的人都照顾不好，又怎么能在工作中发挥出最佳状态呢？"

黛西在你身边坐下，看着屏幕上的文字。

"这份报告写得很好。"

"因为我找到了工作和生活的平衡。"你握住她的手。

三小时后，你完成了可能是职业生涯中最好的一份报告。`,
        background: "./img/End2_Quit.png",
        choices: [
            { text: "重新开始", next: "restart" }
        ]
    },

    "ending3": {
        text: `一个月后，你坐在律师事务所里。

"财产分割很简单，房子归女方，你只需要继续还贷款就行。"律师说。

黛西坐在对面，不再看你。

"关于离婚协议，还有什么问题吗？"

你看着这个陪伴你十年的女人，想说什么，但发现什么都说不出来。

"没有问题。"黛西轻声说。

你想起那个晚上，想起砸坏的电脑，想起紧闭的房门，想起那些永远说不出口的话。

也许，有些东西一旦失去，就再也找不回来了。

"签字吧。"律师说。

你在离婚协议上签下了自己的名字。

十年的婚姻，结束了。`,
        background: "./img/End3_Divorce.png",
        choices: [
            { text: "重新开始", next: "restart" }
        ]
    }
};

// 用于存储已预加载的图片，避免重复加载
const preloadedImages = new Set();

// 用于在屏幕外预加载图片的容器
let preloadContainer = null;

// 创建屏幕外预加载容器
function createPreloadContainer() {
    if (!preloadContainer) {
        preloadContainer = document.createElement('div');
        preloadContainer.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
        `;
        document.body.appendChild(preloadContainer);
        debugLog('创建屏幕外预加载容器');
    }
    return preloadContainer;
}

// 预加载指定图片
function preloadImage(imagePath) {
    if (preloadedImages.has(imagePath)) {
        debugLog(`图片已预加载: ${imagePath}`);
        return;
    }
    
    const container = createPreloadContainer();
    const img = document.createElement('img');
    
    img.onload = () => {
        preloadedImages.add(imagePath);
        debugLog(`图片预加载成功: ${imagePath}`);
    };
    
    img.onerror = () => {
        debugLog(`图片预加载失败: ${imagePath}`);
    };
    
    img.src = imagePath;
    container.appendChild(img);
    debugLog(`开始预加载图片: ${imagePath}`);
}

// 根据故事选择预加载下一个可能的图片
function preloadNextImages(storyId) {
    const story = storyData[storyId];
    if (!story || !story.choices) return;
    
    // 获取所有可能的下一个故事ID
    const nextStoryIds = story.choices.map(choice => choice.next);
    
    // 预加载这些故事的背景图片
    nextStoryIds.forEach(nextId => {
        const nextStory = storyData[nextId];
        if (nextStory && nextStory.background) {
            preloadImage(nextStory.background);
        }
    });
    
    debugLog(`为故事 ${storyId} 预加载了 ${nextStoryIds.length} 个下一阶段的图片`);
}

// 检查标题背景图片是否正确加载
function checkTitleBackgroundImage() {
    if (!titleBackground) return;
    
    const imagePath = './img/0_Title.png';
    
    // 创建一个新的Image对象来测试图片是否能加载
    const testImg = new Image();
    
    testImg.onload = function() {
        debugLog('标题背景图片加载测试成功');
        
        // 检查CSS中的背景图片是否正确应用
        const computedStyle = window.getComputedStyle(titleBackground);
        const bgImage = computedStyle.backgroundImage;
        
        if (bgImage === 'none' || bgImage === '') {
            debugLog('CSS背景图片未应用，尝试强制设置');
            forceTitleBackgroundImage();
        } else {
            debugLog('CSS背景图片已正确应用');
        }
    };
    
    testImg.onerror = function() {
        debugLog('标题背景图片加载失败，尝试备用方案');
        forceTitleBackgroundImage();
    };
    
    testImg.src = imagePath;
}

// 强制设置标题背景图片
function forceTitleBackgroundImage() {
    if (!titleBackground) return;
    
    // 设置备用背景色
    titleBackground.style.backgroundColor = '#1a1a1a';
    
    const imagePath = './img/0_Title.png';
    
    // 直接设置背景图片样式
    titleBackground.style.backgroundImage = `url("${imagePath}")`;
    titleBackground.style.backgroundSize = 'cover';
    titleBackground.style.backgroundPosition = 'center';
    titleBackground.style.backgroundRepeat = 'no-repeat';
    titleBackground.style.opacity = '1';
    
    // 移动端特殊处理
    if (isMobileDevice()) {
        titleBackground.style.backgroundAttachment = 'scroll';
        titleBackground.style.webkitBackgroundSize = 'cover';
        titleBackground.style.webkitTransform = 'translateZ(0)';
        titleBackground.style.webkitBackfaceVisibility = 'hidden';
    }
    
    debugLog('强制设置标题背景图片完成');
    
    // 延迟检查图片是否真正加载成功
    setTimeout(() => {
        const testImg = new Image();
        testImg.onload = () => {
            debugLog('背景图片最终加载成功');
        };
        testImg.onerror = () => {
            debugLog('背景图片最终加载失败，使用备用背景色');
            titleBackground.style.backgroundColor = '#2d2d2d';
            // 添加渐变效果作为备用背景
            titleBackground.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)';
        };
        testImg.src = imagePath;
    }, 500);
}

// 背景图淡入淡出切换函数
function changeBackground(newImageUrl) {
    const currentLayer = currentBackgroundLayer === 1 ? backgroundImage1 : backgroundImage2;
    const nextLayer = currentBackgroundLayer === 1 ? backgroundImage2 : backgroundImage1;
    
    // 设置新背景图到隐藏层
    nextLayer.style.backgroundImage = `url('${newImageUrl}')`;
    
    // 淡入新背景，淡出旧背景
    nextLayer.classList.add('active');
    currentLayer.classList.remove('active');
    
    // 切换当前活跃层
    currentBackgroundLayer = currentBackgroundLayer === 1 ? 2 : 1;
}

// 界面切换功能
function showGameScreen() {
    titleScreen.classList.add('hidden');
    setTimeout(() => {
        gameScreen.classList.add('show');
        initGame();
    }, 800);
}

function showTitleScreen() {
    gameScreen.classList.remove('show');
    setTimeout(() => {
        titleScreen.classList.remove('hidden');
    }, 800);
}

// 初始化游戏
function initGame() {
    // 清除之前的动画状态
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
    isAnimating = false;
    
    // 重置界面状态
    storyTextElement.innerHTML = '';
    choicesContainer.innerHTML = '';
    continueArea.classList.remove('show');
    choicesContainer.classList.remove('show');
    
    // 重置背景图层状态
    backgroundImage1.classList.remove('active');
    backgroundImage2.classList.remove('active');
    currentBackgroundLayer = 1;
    
    // 开始第一个故事
    currentStory = 'start';
    // 首先预加载第一个故事的背景图片
    preloadImage(storyData[currentStory].background);
    showStory(currentStory);
}

// 显示故事内容
function showStory(storyId) {
    const story = storyData[storyId];
    if (!story) {
        console.error('故事节点不存在：', storyId);
        return;
    }

    // 使用淡入淡出效果更新背景图片
    changeBackground(story.background);

    // 预加载下一个可能的故事图片
    preloadNextImages(storyId);

    // 隐藏选项按钮
    choicesContainer.classList.remove('show');

    // 清空文本区域
    storyTextElement.innerHTML = '';

    // 将文本按行分割，过滤空行
    const lines = story.text.split('\n').filter(line => line.trim());
    
    // 手动逐行显示文本
    manualTextDisplay(lines, () => {
        // 文本显示完成后显示选项
        updateChoices(story.choices);
    });
}

// 手动逐行显示文本
function manualTextDisplay(lines, callback) {
    let currentLine = 0;
    isAnimating = true;
    
    // 显示继续区域
    continueArea.classList.add('show');
    
    // 清除之前的动画定时器
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
    
    function showNextLine() {
        if (currentLine >= lines.length) {
            // 所有行都显示完成
            isAnimating = false;
            // 隐藏继续区域
            continueArea.classList.remove('show');
            // 移除点击事件监听器
            continueArea.removeEventListener('click', clickHandler);
            // 延迟显示选项按钮
            const timeoutId = setTimeout(callback, 300);
            animationTimeouts.push(timeoutId);
            return;
        }

        const line = lines[currentLine];
        const p = document.createElement('p');
        p.textContent = line;
        storyTextElement.appendChild(p);

        // 检查是否需要滚动
        checkAndScroll();

        // 显示当前行
        const showTimeoutId = setTimeout(() => {
            if (isAnimating) {
                p.classList.add('show');
            }
        }, 50);
        animationTimeouts.push(showTimeoutId);

        currentLine++;
    }

    // 点击事件处理器
    const clickHandler = () => {
        if (isAnimating) {
            showNextLine();
        }
    };

    // 添加点击事件监听器到继续区域
    continueArea.addEventListener('click', clickHandler);

    // 显示第一行
    showNextLine();
}

// 检查滚动位置并自动滚动
function checkAndScroll() {
    const container = storyTextElement;
    const containerHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    
    // 当内容超出容器高度的80%时开始滚动
    if (scrollHeight > containerHeight) {
        const scrollThreshold = containerHeight * 0.8;
        const currentVisibleBottom = scrollTop + containerHeight;
        
        if (scrollHeight - currentVisibleBottom < scrollThreshold) {
            // 平滑滚动到底部
            container.scrollTo({
                top: scrollHeight - containerHeight,
                behavior: 'smooth'
            });
        }
    }
}

// 更新选择按钮
function updateChoices(choices) {
    choicesContainer.innerHTML = '';

    if (choices && choices.length > 0) {
        // 先添加所有按钮到容器
        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.onclick = () => makeChoice(choice.next);
            button.style.opacity = '0';
            button.style.transform = 'translateY(10px)';
            button.style.transition = 'all 0.4s ease';
            choicesContainer.appendChild(button);
        });

        // 显示选项容器
        setTimeout(() => {
            choicesContainer.classList.add('show');
            
            // 逐个显示按钮
            const buttons = choicesContainer.querySelectorAll('.choice-btn');
            buttons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }, 200);
    } else {
        // 如果没有选择，显示重新开始按钮
        const restartBtn = document.createElement('button');
        restartBtn.className = 'continue-btn';
        restartBtn.textContent = '重新开始';
        restartBtn.onclick = initGame;
        restartBtn.style.opacity = '0';
        restartBtn.style.transform = 'translateY(10px)';
        restartBtn.style.transition = 'all 0.4s ease';
        choicesContainer.appendChild(restartBtn);
        
        setTimeout(() => {
            choicesContainer.classList.add('show');
            setTimeout(() => {
                restartBtn.style.opacity = '1';
                restartBtn.style.transform = 'translateY(0)';
            }, 200);
        }, 200);
    }
}

// 做出选择
function makeChoice(nextStoryId) {
    // 特殊处理restart选项
    if (nextStoryId === 'restart') {
        showTitleScreen();
        return;
    }
    
    if (nextStoryId && storyData[nextStoryId]) {
        // 清除当前动画状态
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];
        isAnimating = false;
        
        // 立即隐藏并清理选择按钮容器，避免触发区域残留
        choicesContainer.classList.remove('show');
        choicesContainer.innerHTML = '';
        
        // 隐藏继续区域
        continueArea.classList.remove('show');
        
        // 重置滚动位置
        storyTextElement.scrollTop = 0;
        
        currentStory = nextStoryId;
        showStory(nextStoryId);
    }
}

// 重新开始游戏
function restartGame() {
    if (confirm('确定要重新开始游戏吗？')) {
        showTitleScreen();
    }
}

// 键盘事件监听
document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        restartGame();
    }
});

// 防止页面缩放
document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
});

// 动态适配屏幕尺寸
function adaptToScreenSize() {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const aspectRatio = vh / vw;
    const isSmallScreen = vh < 600 || vw < 400;
    
    // 重新设计的布局参数 - 更加直观和有效
    let textAreaHeight, buttonAreaHeight, safeAreaPadding;
    
    if (isSmallScreen) {
        // 小屏幕设备：给文字更多空间，但确保按钮可见
        textAreaHeight = '58vh';
        buttonAreaHeight = '32vh';
        safeAreaPadding = '10px';
    } else if (aspectRatio > 2.2) {
        // 超长屏幕 (如21:9+)：充分利用垂直空间
        textAreaHeight = '65vh';
        buttonAreaHeight = '25vh';
        safeAreaPadding = '15px';
    } else if (aspectRatio > 2.0) {
        // 很长屏幕 (如20:9)
        textAreaHeight = '62vh';
        buttonAreaHeight = '28vh';
        safeAreaPadding = '15px';
    } else if (aspectRatio > 1.8) {
        // 长屏幕 (如18:9, 19.5:9)
        textAreaHeight = '58vh';
        buttonAreaHeight = '32vh';
        safeAreaPadding = '20px';
    } else if (aspectRatio > 1.5) {
        // 标准屏幕 (如16:9)
        textAreaHeight = '55vh';
        buttonAreaHeight = '35vh';
        safeAreaPadding = '20px';
    } else {
        // 宽屏或横屏：文字区域相对较小，按钮区域适中
        textAreaHeight = '50vh';
        buttonAreaHeight = '38vh';
        safeAreaPadding = '15px';
    }
    
    // 应用新的动态样式
    document.documentElement.style.setProperty('--text-area-height', textAreaHeight);
    document.documentElement.style.setProperty('--button-area-height', buttonAreaHeight);
    document.documentElement.style.setProperty('--safe-area-padding', safeAreaPadding);
    
    // 调试信息（开发时可取消注释）
    // console.log(`Screen: ${vw}x${vh}, Ratio: ${aspectRatio.toFixed(2)}, Text: ${textAreaHeight}, Button Area: ${buttonAreaHeight}, Padding: ${safeAreaPadding}`);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 清理可能存在的调试元素
    const debugDiv = document.getElementById('debug-info');
    if (debugDiv) {
        debugDiv.remove();
    }
    
    // 初始化DOM元素引用
    titleScreen = document.getElementById('titleScreen');
    gameScreen = document.getElementById('gameScreen');
    startGameBtn = document.getElementById('startGameBtn');
    backgroundImage1 = document.getElementById('backgroundImage1');
    backgroundImage2 = document.getElementById('backgroundImage2');
    storyTextElement = document.getElementById('storyText');
    choicesContainer = document.getElementById('choicesContainer');
    continueArea = document.getElementById('continueArea');
    titleBackground = document.querySelector('.title-background');
    
    // 移动端调试信息
    debugLog(`设备类型: ${isMobileDevice() ? '移动设备' : '桌面设备'}`);
    debugLog(`屏幕尺寸: ${window.innerWidth}x${window.innerHeight}`);
    debugLog(`用户代理: ${navigator.userAgent}`);
    
    adaptToScreenSize();
    
    // 检查关键DOM元素是否正确获取
    if (!titleBackground) {
        debugLog('错误：无法找到.title-background元素');
    } else {
        debugLog('成功找到.title-background元素');
        
        // 延迟检查背景图片，确保CSS样式已加载
        setTimeout(() => {
            checkTitleBackgroundImage();
        }, 100);
    }
    
    // 绑定开始游戏按钮事件
    startGameBtn.addEventListener('click', () => {
        showGameScreen();
    });
    
    // 首页背景图片已直接在CSS中设置，无需预加载
    debugLog('游戏初始化完成，使用按需预加载模式');
});

// 监听屏幕尺寸变化
window.addEventListener('resize', adaptToScreenSize);
window.addEventListener('orientationchange', () => {
    setTimeout(adaptToScreenSize, 100); // 延迟执行，等待方向变化完成
});

// 页面可见性变化时暂停/恢复
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时可以做一些清理工作
    } else {
        // 页面显示时可以恢复
    }
});

// 错误处理
window.addEventListener('error', (event) => {
    console.error('游戏发生错误：', event.error);
}); 