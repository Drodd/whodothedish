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
        background: "img/1_After_dinner.png",
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
        background: "img/9_Washdish.png",
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
        background: "img/2_Wife_unhappy.png",
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
        background: "img/3_Play_foolish.png",
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
        background: "img/4_Sweet_words.png",
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
        background: "img/5_Apology.png",
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
        background: "img/9_Washdish.png",
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
        background: "img/6_Wife_angry.png",
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
        background: "img/8_Working.png",
        choices: [
            { text: "继续", next: "ending3" }
        ]
    },

    "ignore_me": {
        text: `"黛西，等等，我错了。我不应该那样和你说话，我道歉。"

黛西停下脚步但没转身，肩膀微微颤抖。

"不要碰我。"黛西声音很轻但坚决。
她慢慢转身，脸上没有愤怒，只有深深疲惫。

"你知道吗？我刚才听你说话时，突然觉得很陌生。我想不起来你什么时候变成这样的。"

她走向卧室，在门口停下。
"你去写你的报告吧。这可能是我们最后一次为洗碗争吵了。"

卧室门轻轻关上，留下你一人。`,
        background: "img/7_Close_door.png",
        choices: [
            { text: "继续", next: "ending1" }
        ]
    },

    "ending1": {
        text: `凌晨3点，你完成了报告。黛西早就睡了，卧室门紧闭。

第二天一早，老板坐在会议室，脸色阴沉。
你递上文件："昨晚通宵完成的，所有数据都在这里。"

老板翻几页，把报告扔在桌上。
"收拾东西，今天就不用来了。"

十年努力，就这样结束了。

走出大楼时，你看到新闻推送：
"某知名企业因财务造假被查封，CEO涉嫌挪用公款已被逮捕..."

正是你刚被解雇的公司。原来公司早就资不抵债，你昨晚的报告不过是张废纸。

手机响了，黛西短信："看到新闻了。你还好吗？"

你忽然意识到，真正重要的东西，你差点就永远失去了。

=== 结局1：被炒鱿鱼 ===`,
        background: "img/End1_Fired.png",
        choices: []
    },

    "ending2": {
        text: `晚上，你和黛西度过了十年来最温馨的时光。
没有工作干扰，只是静静依偎在沙发上看电影。

"你知道吗？我已经很久没有这么开心了。"黛西轻声说。

"我也是。我想起了为什么会相爱，为什么会结婚。"

"是因为那时候的你，眼里有光。现在，那道光又回来了。"

第二天早晨，老板在会议室等着。
"报告呢？"

"没有报告。"你平静地说。"而且，我也不会再写任何报告了。"

"你疯了吗？"老板站起身。

"我很清醒。这份工作，这家公司，都不值得我牺牲家庭和健康。"
你拿起辞职信放在老板面前。

走出办公楼时，你感到前所未有的轻松。

你给黛西发短信："亲爱的，我自由了。今天晚上，让我来做饭，好吗？"

黛西回复："好呀！我爱你。"

=== 结局2：炒老板鱿鱼 ===`,
        background: "img/End2_Quit.png",
        choices: []
    },

    "ending3": {
        text: `第二天早上，你忐忑不安地来到公司。
没有电脑，没有报告。

"怎么？报告呢？"老板讥讽地笑。

"昨晚...电脑坏了。"

"让我猜猜，又是家里的事情搞砸了？"
"你还真是什么都做不好，明天不用来上班了。"

你跌跌撞撞走出公司，不敢回家。

下午才鼓起勇气推开家门。

黛西坐在沙发上，茶几上放着几张纸。
"这是离婚协议书。我已经签好了。"

"黛西，你在开玩笑吧？"

"我没有开玩笑。我想了一整晚，我们已经无法继续下去了。明天我会来拿东西。"

十年婚姻，就这样结束了。

"也许，这对我们都是解脱。"她停在门口。

门轻轻关上，留下你一人坐在空荡荡的客厅里。

=== 结局3：离婚 ===`,
        background: "img/End3_Divorce.png",
        choices: []
    }
};

// 游戏状态
let currentStory = "start";
let gameHistory = [];
let isAnimating = false;
let animationTimeouts = [];

// DOM元素
const storyTextElement = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const backgroundElement = document.getElementById('background');
const continueArea = document.getElementById('continue-area');

// 初始化游戏
function initGame() {
    currentStory = "start";
    gameHistory = [];
    
    // 清除动画状态
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
    isAnimating = false;
    
    // 重置滚动位置
    storyTextElement.scrollTop = 0;
    
    // 隐藏选项按钮和继续区域
    choicesContainer.classList.remove('show');
    continueArea.classList.remove('show');
    
    showStory(currentStory);
}

// 显示故事内容
function showStory(storyId) {
    const story = storyData[storyId];
    if (!story) {
        console.error('故事节点不存在：', storyId);
        return;
    }

    // 更新背景图片
    backgroundElement.style.backgroundImage = `url('${story.background}')`;

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

    // 记录历史
    gameHistory.push(storyId);
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
    if (nextStoryId && storyData[nextStoryId]) {
        // 清除当前动画状态
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        animationTimeouts = [];
        isAnimating = false;
        
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
        initGame();
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initGame);

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

// 预加载图片
function preloadImages() {
    const images = [
        'img/1_After_dinner.png',
        'img/2_Wife_unhappy.png',
        'img/3_Play_foolish.png',
        'img/4_Sweet_words.png',
        'img/5_Apology.png',
        'img/6_Wife_angry.png',
        'img/7_Close_door.png',
        'img/8_Working.png',
        'img/9_Washdish.png',
        'img/End1_Fired.png',
        'img/End2_Quit.png',
        'img/End3_Divorce.png'
    ];

    images.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// 预加载图片
preloadImages(); 