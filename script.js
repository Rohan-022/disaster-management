// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// Hero section animated background
function createDisasterIcons() {
    const bgElement = document.getElementById('animated-bg');
    const icons = ['fa-fire', 'fa-water', 'fa-wind', 'fa-cloud-showers-heavy', 
                 'fa-house-damage', 'fa-temperature-high', 'fa-smog', 'fa-biohazard'];
    const iconCount = 15;
    
    for(let i = 0; i < iconCount; i++) {
        const icon = document.createElement('i');
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        icon.className = `fas ${randomIcon} disaster-icon`;
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.top = `${Math.random() * 100}%`;
        icon.style.animationDuration = `${10 + Math.random() * 20}s`;
        icon.style.animationDelay = `${Math.random() * 5}s`;
        bgElement.appendChild(icon);
    }
}
createDisasterIcons();

// Initialize Pie Chart in Hero Section
function initHeroPieChart() {
    const ctx = document.getElementById('disasterPieChart').getContext('2d');
    
    // Data from the image
    const data = {
        labels: ['Flood', 'Earthquake', 'Drought', 'cyclone', 'other'],
        datasets: [{
            data: [22, 8, 12, 3, 4],
            backgroundColor: [
                '#116466',
                '#D9B08C',
                '#FFCB9A',
                '#D1E8E2',
                '#2C3531'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    }
                }
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };
    
    // Create the pie chart
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    
    // Toggle 3D effect
    let is3D = false;
    document.getElementById('toggle3d').addEventListener('click', function() {
        is3D = !is3D;
        
        if (is3D) {
            pieChart.options.plugins.tooltip = {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    }
                }
            };
            pieChart.options.elements = {
                arc: {
                    borderWidth: 0,
                    borderRadius: 10
                }
            };
        } else {
            pieChart.options.plugins.tooltip = {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value}%`;
                    }
                }
            };
            pieChart.options.elements = {
                arc: {
                    borderWidth: 2,
                    borderRadius: 0
                }
            };
        }
        
        pieChart.update();
    });
}

// Interactive Dashboard Charts
function initDashboardCharts() {
    // Population vs Disaster Chart
    const popVsDisasterCtx = document.getElementById('popVsDisasterChart').getContext('2d');
    const popVsDisasterChart = new Chart(popVsDisasterCtx, {
        type: 'line',
        data: {
            labels: ['1970', '1980', '1990', '2000', '2010', '2020'],
            datasets: [
                {
                    label: 'Population (Billions)',
                    data: [0.55, 0.7, 0.85, 1.05, 1.2, 1.38],
                    borderColor: '#116466',
                    backgroundColor: 'rgba(17, 100, 102, 0.1)',
                    borderWidth: 3,
                    fill: true
                },
                {
                    label: 'Disaster Frequency (per decade)',
                    data: [50, 80, 120, 190, 250, 310],
                    borderColor: '#D9B08C',
                    backgroundColor: 'rgba(217, 176, 140, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Population (Billions)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Disaster Frequency'
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                }
            }
        }
    });
    
    // Heatmap Chart with ApexCharts
    const heatmapData = [
        {
            name: 'Poverty',
            data: generateHeatMapData([5, 7, 9, 4, 6, 8, 3])
        },
        {
            name: 'Pollution',
            data: generateHeatMapData([8, 5, 3, 7, 9, 4, 6])
        },
        {
            name: 'Water Scarcity',
            data: generateHeatMapData([6, 9, 7, 5, 3, 8, 4])
        },
        {
            name: 'Migration',
            data: generateHeatMapData([4, 6, 8, 5, 7, 3, 9])
        }
    ];
    
    const heatmapOptions = {
        series: heatmapData,
        chart: {
            height: 300,
            type: 'heatmap',
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#116466"],
        title: {
            text: 'Social Issues by State/Region'
        },
        xaxis: {
            categories: ['Maharashtra', 'Kerala', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Uttar Pradesh', 'West Bengal']
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 0, to: 3, color: '#D1E8E2', name: 'Low' },
                        { from: 4, to: 6, color: '#FFCB9A', name: 'Medium' },
                        { from: 7, to: 10, color: '#c23d35', name: 'High' }
                    ]
                }
            }
        }
    };
    
    const heatmapChart = new ApexCharts(document.getElementById("heatmapChart"), heatmapOptions);
    heatmapChart.render();
}

function generateHeatMapData(baseValues) {
    return baseValues.map((value, index) => {
        return { x: index, y: value };
    });
}

// Initialize Population Slider
function initPopulationSlider() {
    $("#populationSlider").slider({
        min: 0,
        max: 100,
        value: 50,
        slide: function(event, ui) {
            $("#populationValue").text(ui.value);
            updateStrainEffects(ui.value);
        }
    });
}

function updateStrainEffects(value) {
    const effects = [
        `Water resources depleted by ${Math.round(value/2)}%`,
        `Deforestation increased by ${Math.round(value*0.6)}%`,
        `Air quality reduced by ${Math.round(value*0.4)}%`,
        `Risk of flooding increased by ${Math.round(value*0.3)}%`
    ];
    
    if (value > 80) {
        effects.push(`Urban heat islands temperature increased by ${Math.round(value*0.15)}°C`);
    }
    
    const strainList = document.getElementById('strainEffects');
    strainList.innerHTML = effects.map(effect => `<li>${effect}</li>`).join('');
}

// India Map
function initIndiaMap() {
    const map = L.map('indiaMap').setView([22.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add disaster markers
    const disasters = [
        { name: "Uttarakhand Floods (2013)", lat: 30.0668, lng: 79.0193, type: "flood" },
        { name: "Vizag Gas Leak (2020)", lat: 17.7224, lng: 83.3013, type: "industrial" },
        { name: "Bhopal Gas Tragedy (1984)", lat: 23.2599, lng: 77.4126, type: "industrial" },
        { name: "Kerala Floods (2018)", lat: 10.1632, lng: 76.6413, type: "flood" },
        { name: "Delhi Air Pollution Crisis", lat: 28.7041, lng: 77.1025, type: "pollution" },
        { name: "Gujarat Earthquake (2001)", lat: 23.2156, lng: 69.6695, type: "earthquake" },
        { name: "Cyclone Fani (2019)", lat: 19.7515, lng: 85.8245, type: "cyclone" }
    ];
    
    disasters.forEach(disaster => {
        let icon = 'fa-water';
        let color = 'blue';
        
        if (disaster.type === 'industrial') {
            icon = 'fa-industry';
            color = 'purple';
        } else if (disaster.type === 'pollution') {
            icon = 'fa-smog';
            color = 'gray';
        } else if (disaster.type === 'earthquake') {
            icon = 'fa-house-damage';
            color = 'red';
        } else if (disaster.type === 'cyclone') {
            icon = 'fa-wind';
            color = 'green';
        }
        
        const customIcon = L.divIcon({
            html: `<i class="fas ${icon}" style="color: ${color}; font-size: 24px;"></i>`,
            className: 'disaster-map-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([disaster.lat, disaster.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <strong>${disaster.name}</strong><br>
            <button class="disaster-info-btn px-2 py-1 bg-primary text-yellow text-sm rounded mt-2" 
            data-disaster="${disaster.name.replace(/\s/g, '')}">View Details</button>
        `);
        
        marker.on('popupopen', function() {
            document.querySelectorAll('.disaster-info-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    showDisasterInfo(this.getAttribute('data-disaster'));
                });
            });
        });
    });
}

function showDisasterInfo(disasterId) {
    // This would be connected to a real API in the future
    // For now we'll just show a sample modal with info
    alert("This feature will show detailed information about " + disasterId.replace(/([A-Z])/g, ' $1').trim() + " in the full version.");
}

// Case Studies
function initCaseStudies() {
    const caseCards = document.querySelectorAll('.case-card');
    const caseDetails = document.getElementById('case-details');
    const backButton = document.querySelector('.back-to-timeline');
    
    // Case study data (would come from API in real version)
    const caseStudyData = {
        uttarakhand: {
            title: "Uttarakhand Floods (2013)",
            beforeImage: "beforeu.png",
            afterImage: "afteru.webp",
            causes: "The Uttarakhand floods were caused by excessive rainfall, cloudbursts, and accelerated snowmelt. Human factors including deforestation, poorly planned hydroelectric projects, and unregulated construction along riverbanks amplified the disaster's impact.",
            social: "Over 5,700 people died or went missing. Thousands of villages were affected, with many completely washed away. The tourism industry collapsed, causing widespread unemployment. Many survivors faced trauma, homelessness, and disrupted livelihoods.",
            environmental: "Massive landslides altered river courses. Silt deposits changed river ecology. Wildlife habitats were destroyed. Water sources were contaminated with debris and bodies.",
            lessons: "Himalayan ecosystems are fragile and require careful management. Early warning systems and disaster preparedness are essential. Unplanned development in ecologically sensitive zones can have catastrophic consequences.",
            prevention: "Implementing strict regulations on construction in flood plains. Developing advanced early warning systems. Maintaining natural forests as flood barriers. Regular disaster drills and community preparedness programs."
        },
        vizag: {
            title: "Vizag Gas Leak (2020)",
            beforeImage: "beforev.webp",
            afterImage: "afterv.png",
            causes: "Styrene gas leaked from an LG Polymers plant. The leak occurred after long-term storage during COVID-19 lockdown without proper maintenance. Temperature control systems failed, causing the stored chemical to heat and vaporize.",
            social: "At least 11 people died and over 1,000 were hospitalized. Surrounding villages were evacuated. Many survivors experienced long-term respiratory issues. Trust in industrial safety was severely damaged.",
            environmental: "Air and water pollution affected a large area. Crops were damaged. Soil contamination occurred in surrounding agricultural lands. Many animals and livestock died from exposure.",
            lessons: "Industrial facilities must maintain safety protocols even during shutdowns. Buffer zones between industrial and residential areas are essential. Emergency response plans must include nearby communities.",
            prevention: "Regular safety audits and maintenance. Proper hazard assessment and risk management. Community awareness programs and evacuation drills. Strict enforcement of environmental regulations."
        },
        bhopal: {
            title: "Bhopal Gas Tragedy (1984)",
            beforeImage: "beforeb.webp",
            afterImage: "bhopal-gas-tragedy-1701511067.jpg",
            causes: "Water entered a methyl isocyanate (MIC) storage tank at the Union Carbide pesticide plant, causing an exothermic reaction. Safety systems were inadequate or non-functional. Poor maintenance and cost-cutting contributed to the disaster.",
            social: "Over 3,787 confirmed deaths, with estimates up to 16,000. 558,125 injuries including permanent disabilities. Generations continue to suffer from birth defects and chronic diseases. Survivors faced stigma and economic hardship.",
            environmental: "Soil and groundwater contamination persists decades later. The surrounding ecosystem was devastated. Chemical waste remains unremediated at the factory site.",
            lessons: "Industrial safety cannot be compromised for profit. Proper emergency response systems must be maintained. Urban planning must separate industrial and residential zones. Corporate accountability is essential in hazardous industries.",
            prevention: "Stringent industrial safety regulations and regular inspections. Corporate liability for environmental damage. Community right-to-know laws about chemical hazards. Emergency preparedness training for vulnerable communities."
        },
        kerala: {
            title: "Kerala Floods (2018)",
            beforeImage: "beforek.jpg",
            afterImage: "FL25KERALAFLOOD.webp",
            causes: "Unusually high rainfall during monsoon season. Simultaneous opening of all major dam reservoirs. Deforestation and loss of wetlands reduced natural flood protection. Climate change contributed to extreme weather patterns.",
            social: "483 people died. Over 14 lakh people were displaced to relief camps. Infrastructure damage exceeded ₹40,000 crore. Tourism and agriculture sectors were severely impacted.",
            environmental: "Landslides damaged Western Ghats ecosystems. Water contamination caused widespread disease risk. Soil erosion and siltation affected farmland fertility. Native species habitats were destroyed.",
            lessons: "Coordinated reservoir management is crucial. Natural flood buffers like wetlands must be preserved. Climate change adaptation must be part of disaster planning. Community-based early warning systems save lives.",
            prevention: "Integrated watershed management. Restoring wetlands and natural drainage systems. Climate-resilient infrastructure development. Community-based disaster response networks."
        },
        delhi: {
            title: "Delhi Air Pollution Crisis",
            beforeImage: "befored.webp",
            afterImage: "Winter-air-pollution-in-New-Delhi-Suraj-Singh-Bisht-696x392.jpg-e1762764963130.avif",
            causes: "Vehicle emissions and industrial pollution. Stubble burning in surrounding agricultural states. Construction dust and thermal power plants. Geographic factors that trap pollutants during winter months.",
            social: "Respiratory diseases affect millions. School closures during severe episodes. Productivity losses estimated at billions of rupees annually. Disproportionate impact on outdoor workers and economically disadvantaged communities.",
            environmental: "Decreased visibility and smog formation. Acid rain affecting historical monuments. Reduced photosynthesis in plants. Ecosystem disruption affecting urban biodiversity.",
            lessons: "Air pollution requires regional cooperation beyond city boundaries. Short-term measures are insufficient without systemic change. Public health impacts create enormous economic costs. Environmental justice is essential as vulnerable populations suffer most.",
            prevention: "Transition to clean energy and electric vehicles. Providing farmers with alternatives to stubble burning. Strict industrial emission standards. Improved public transportation systems. Green barriers and urban forests."
        }
    };
    
    caseCards.forEach(card => {
        card.addEventListener('click', function() {
            const caseId = this.getAttribute('data-id');
            const caseData = caseStudyData[caseId];
            
            if (caseData) {
                document.getElementById('case-title').textContent = caseData.title;
                document.getElementById('image-before').src = caseData.beforeImage;
                document.getElementById('image-after').src = caseData.afterImage;
                document.getElementById('causes-content').textContent = caseData.causes;
                document.getElementById('social-content').textContent = caseData.social;
                document.getElementById('environmental-content').textContent = caseData.environmental;
                document.getElementById('lessons-content').textContent = caseData.lessons;
                document.getElementById('prevention-content').textContent = caseData.prevention;
                
                // Show case details and hide timeline
                document.querySelector('.timeline').style.display = 'none';
                caseDetails.classList.remove('hidden');
            }
        });
    });
    
    // Case study tabs
    const caseTabs = document.querySelectorAll('.case-tab');
    caseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab styling
            caseTabs.forEach(t => t.classList.remove('border-primary'));
            this.classList.add('border-b-2', 'border-primary');
            
            // Show corresponding content
            document.querySelectorAll('.case-detail').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Back button
    backButton.addEventListener('click', function() {
        document.querySelector('.timeline').style.display = 'block';
        caseDetails.classList.add('hidden');
    });
    
    // Image comparison slider
    const sliderHandle = document.querySelector('.slider-handle');
    const afterImage = document.querySelector('.image-comparison .after');
    
    let isDragging = false;
    
    sliderHandle.addEventListener('mousedown', () => {
        isDragging = true;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const container = document.querySelector('.image-comparison');
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        
        if (percent > 0 && percent < 100) {
            sliderHandle.style.left = `${percent}%`;
            afterImage.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
        }
    });
}

// Environment-Population-Social Issue Animation
function initAnimation() {
    const steps = document.querySelectorAll('.animation-step');
    let currentStep = 0;
    let interval;
    let isPlaying = false;
    
    function playAnimation() {
        if (isPlaying) return;
        
        isPlaying = true;
        interval = setInterval(() => {
            steps[currentStep].classList.remove('active');
            currentStep = (currentStep + 1) % steps.length;
            steps[currentStep].classList.add('active');
        }, 3000);
    }
    
    function pauseAnimation() {
        clearInterval(interval);
        isPlaying = false;
    }
    
    document.getElementById('play-animation').addEventListener('click', playAnimation);
    document.getElementById('pause-animation').addEventListener('click', pauseAnimation);
}

// Quiz functionality
function initQuiz() {
    const questions = [
        {
            question: "Which of these is NOT a natural disaster?",
            options: ["Earthquake", "Tsunami", "Gas leak", "Cyclone"],
            answer: 2
        },
        {
            question: "Which social issue increases vulnerability to disasters the most?",
            options: ["Access to technology", "Poverty", "Political representation", "Media coverage"],
            answer: 1
        },
        {
            question: "Which human activity contributes most to increased flooding risk?",
            options: ["Deforestation", "Internet usage", "Tourism", "Vehicle ownership"],
            answer: 0
        },
        {
            question: "The Bhopal Gas Tragedy of 1984 was caused by a leak of:",
            options: ["Chlorine", "Methyl isocyanate", "Carbon monoxide", "Sulfur dioxide"],
            answer: 1
        },
        {
            question: "What percentage of India's population lives in areas vulnerable to natural disasters?",
            options: ["Around 30%", "Around 45%", "Around 60%", "Around 75%"],
            answer: 2
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    let timeLeft = 30;
    let timer;
    
    const startBtn = document.getElementById('start-quiz');
    const nextBtn = document.getElementById('next-question');
    const quizStart = document.getElementById('quiz-start');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResult = document.getElementById('quiz-result');
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const timerEl = document.getElementById('timer');
    const scoreEl = document.getElementById('score');
    const totalScoreEl = document.getElementById('total-score');
    const certificateScoreEl = document.getElementById('certificate-score');
    const restartBtn = document.getElementById('restart-quiz');
    
    function startQuiz() {
        quizStart.classList.add('hidden');
        quizQuestions.classList.remove('hidden');
        totalQuestionsEl.textContent = questions.length;
        loadQuestion();
        startTimer();
    }
    
    function loadQuestion() {
        selectedOption = null;
        nextBtn.disabled = true;
        currentQuestionEl.textContent = currentQuestion + 1;
        questionText.textContent = questions[currentQuestion].question;
        
        optionsList.innerHTML = '';
        questions[currentQuestion].options.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'quiz-option';
            li.textContent = option;
            li.dataset.index = index;
            li.addEventListener('click', selectOption);
            optionsList.appendChild(li);
        });
        
        resetTimer();
    }
    
    function selectOption() {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedOption = parseInt(this.dataset.index);
        nextBtn.disabled = false;
    }
    
    function nextQuestion() {
        if (selectedOption === questions[currentQuestion].answer) {
            score++;
        }
        
        clearInterval(timer);
        
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
            startTimer();
        } else {
            showResult();
        }
    }
    
    function startTimer() {
        timeLeft = 30;
        timerEl.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }
    
    function resetTimer() {
        clearInterval(timer);
        timeLeft = 30;
        timerEl.textContent = timeLeft;
    }
    
    function showResult() {
        quizQuestions.classList.add('hidden');
        quizResult.classList.remove('hidden');
        scoreEl.textContent = score;
        totalScoreEl.textContent = questions.length;
        certificateScoreEl.textContent = `${score}/${questions.length}`;
    }
    
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        quizResult.classList.add('hidden');
        loadQuestion();
        startTimer();
        quizQuestions.classList.remove('hidden');
    }
    
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    // Certificate download functionality
    document.getElementById('download-certificate').addEventListener('click', function() {
        alert("In the full version, this button will generate and download a PDF certificate with your score!");
    });
}

// Disaster Predictor
function initDisasterPredictor() {
    const predictorForm = document.getElementById('predictorForm');
    const predictionResult = document.getElementById('predictionResult');
    
    predictorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const population = this.elements['population'].value;
        const deforestation = this.elements['deforestation'].value;
        const urbanisation = this.elements['urbanisation'].value;
        const climateChange = this.elements['climateChange'].value;
        
        // Simple rule-based prediction algorithm
        let risks = [];
        let riskLevel = 'Low';
        let riskColor = 'green';
        
        if (population === 'high' || population === 'very-high') {
            risks.push('Higher vulnerability due to dense population');
        }
        
        if (deforestation === 'severe' || deforestation === 'critical') {
            risks.push('Increased risk of landslides and flash floods');
            riskLevel = 'High';
            riskColor = 'red';
        }
        
        if (urbanisation === 'rapid' || urbanisation === 'explosive') {
            risks.push('Urban flooding due to poor drainage and excessive concrete');
            if (riskLevel !== 'High') {
                riskLevel = 'Medium';
                riskColor = 'orange';
            }
        }
        
        if (climateChange === 'significant' || climateChange === 'severe') {
            risks.push('Extreme weather events and unpredictable rainfall patterns');
            riskLevel = 'High';
            riskColor = 'red';
        }
        
        if (risks.length === 0) {
            risks.push('Minimal disaster risk identified based on inputs');
        }
        
        let primaryRisk = '';
        
        if (deforestation === 'severe' && urbanisation === 'rapid') {
            primaryRisk = 'Flooding';
        } else if (population === 'very-high' && climateChange === 'severe') {
            primaryRisk = 'Heat Waves and Water Shortages';
        } else if (deforestation === 'critical') {
            primaryRisk = 'Landslides';
        } else if (urbanisation === 'explosive') {
            primaryRisk = 'Urban Flooding';
        } else {
            primaryRisk = 'Multiple Hazards';
        }
        
        // Display results
        predictionResult.innerHTML = `
            <div class="text-center mb-6">
                <i class="fas fa-exclamation-triangle text-5xl mb-4" style="color: ${riskColor};"></i>
                <h3 class="text-2xl font-bold" style="color: ${riskColor};">${riskLevel} Risk Predicted</h3>
                <p class="text-xl mt-2">Primary risk: ${primaryRisk}</p>
            </div>
            
            <div class="mt-6">
                <h4 class="font-semibold mb-2">Detailed Assessment:</h4>
                <ul class="list-disc pl-5">
                    ${risks.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mt-6 pt-4 border-t">
                <h4 class="font-semibold mb-2">Recommendations:</h4>
                <ul class="list-disc pl-5">
                    <li>Develop community-based early warning systems</li>
                    <li>Implement proper land-use planning and regulations</li>
                    <li>Restore natural buffers like forests and wetlands</li>
                    <li>Improve drainage infrastructure in urban areas</li>
                </ul>
            </div>
        `;
    });
}

// Build Your Own Disaster Plan
function initDisasterPlan() {
    const planForm = document.getElementById('planForm');
    const planResult = document.getElementById('planResult');
    const saveBtn = document.getElementById('savePlan');
    
    planForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const locationType = this.elements['locationType'].value;
        const familySize = this.elements['familySize'].value;
        const considerations = [];
        this.elements['considerations'].forEach(checkbox => {
            if (checkbox.checked) {
                considerations.push(checkbox.value);
            }
        });
        const disasterType = this.elements['disasterType'].value;
        
        // Generate custom plan based on inputs
        let emergencyItems = [
            "Drinking water (1 gallon per person per day for at least 3 days)",
            "Non-perishable food (enough for 3 days)",
            "Battery-powered or hand-crank radio",
            "Flashlight and extra batteries",
            "First aid kit",
            "Whistle to signal for help",
            "Dust mask, plastic sheeting and duct tape",
            "Moist towelettes, garbage bags and plastic ties",
            "Wrench or pliers for utilities",
            "Local maps",
            "Cell phone with chargers and backup battery"
        ];
        
        // Add location-specific items
        if (locationType === 'urban') {
            emergencyItems.push("Crowbar (for debris)",
            "Emergency contact cards with neighborhood meeting points");
        } else if (locationType === 'rural') {
            emergencyItems.push("Extra fuel for generator",
            "Emergency signal flares");
        } else if (locationType === 'coastal') {
            emergencyItems.push("Life jackets",
            "Waterproof document container");
        }
        
        // Add family size considerations
        if (familySize === '5-6' || familySize === '7+') {
            emergencyItems.push("Multiple evacuation routes for large group",
            "Family communication plan with designated meeting points");
        }
        
        // Add special considerations
        if (considerations.includes('elderly')) {
            emergencyItems.push("Extra prescription medications",
            "Mobility aids",
            "Extra warm clothing and blankets");
        }
        
        if (considerations.includes('children')) {
            emergencyItems.push("Infant formula and diapers (if applicable)",
            "Activities for children",
            "Comfort items/toys");
        }
        
        if (considerations.includes('pets')) {
            emergencyItems.push("Pet food and water",
            "Pet carriers and leashes",
            "Pet medications");
        }
        
        if (considerations.includes('medical')) {
            emergencyItems.push("Medical supplies/equipment",
            "List of medications and dosages",
            "Copies of prescriptions",
            "Doctor contact information");
        }
        
        // Disaster-specific items and steps
        let disasterItems = [];
        let disasterSteps = [];
        
        if (disasterType === 'flood') {
            disasterItems = [
                "Waterproof boots",
                "Inflatable raft or boat",
                "Water purification tablets"
            ];
            disasterSteps = [
                "Move to higher ground immediately",
                "Avoid walking or driving through flood waters",
                "Be prepared to evacuate quickly",
                "Waterproof important documents"
            ];
        } else if (disasterType === 'earthquake') {
            disasterItems = [
                "Sturdy shoes",
                "Work gloves",
                "Fire extinguisher"
            ];
            disasterSteps = [
                "Drop, Cover, and Hold On during shaking",
                "Stay away from windows and exterior walls",
                "If outdoors, move to a clear area away from buildings",
                "Be prepared for aftershocks"
            ];
        } else if (disasterType === 'cyclone') {
            disasterItems = [
                "Window board-up materials",
                "Waterproof clothing",
                "Portable weather radio"
            ];
            disasterSteps = [
                "Secure outdoor objects or bring them inside",
                "Cover all windows with storm shutters or plywood",
                "Stay in a small, interior room away from windows",
                "Evacuate if directed by authorities"
            ];
        } else if (disasterType === 'fire') {
            disasterItems = [
                "N95 respirator masks",
                "Fire extinguisher",
                "Heat-resistant gloves"
            ];
            disasterSteps = [
                "Create a defensible space around your home",
                "Have multiple evacuation routes planned",
                "Close all windows and doors but leave unlocked",
                "Turn on outside lights to help first responders"
            ];
        } else if (disasterType === 'industrial') {
            disasterItems = [
                "Gas masks or respiratory protection",
                "Plastic sheeting and duct tape for sealing rooms",
                "Chemical suit if available"
            ];
            disasterSteps = [
                "Evacuate the area if instructed",
                "If told to shelter-in-place, turn off HVAC systems",
                "Seal all windows, doors and air vents",
                "Listen to local emergency radio for instructions"
            ];
        }
        
        // Combine all items
        emergencyItems = [...emergencyItems, ...disasterItems];
        
        // Display the plan
        planResult.innerHTML = `
            <h3 class="text-xl font-semibold mb-4">Your Personalized ${getDisasterName(disasterType)} Plan</h3>
            
            <div class="mb-6">
                <h4 class="font-semibold text-primary mb-2">Emergency Kit Items:</h4>
                <ul class="list-disc pl-5">
                    ${emergencyItems.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mb-6">
                <h4 class="font-semibold text-primary mb-2">Step-by-Step Plan:</h4>
                <ol class="list-decimal pl-5">
                    ${disasterSteps.map(step => `<li class="mb-2">${step}</li>`).join('')}
                </ol>
            </div>
            
            <div class="p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 class="font-semibold text-blue-700 mb-2">Important Reminders:</h4>
                <ul class="list-disc pl-5">
                    <li>Update your emergency contacts regularly</li>
                    <li>Review and practice your plan with all family members</li>
                    <li>Check emergency supplies every 6 months</li>
                    <li>Keep important documents in a waterproof, portable container</li>
                </ul>
            </div>
        `;
        
        saveBtn.classList.remove('hidden');
    });
    
    function getDisasterName(type) {
        const names = {
            flood: "Flood",
            earthquake: "Earthquake",
            cyclone: "Cyclone/Hurricane",
            fire: "Fire",
            drought: "Drought",
            industrial: "Industrial Disaster"
        };
        return names[type] || "Disaster";
    }
    
    saveBtn.addEventListener('click', function() {
        alert("In the full version, this will save your plan as a PDF or to your device's local storage!");
    });
}

// Carbon Footprint Calculator
function initCarbonCalculator() {
    const carbonForm = document.getElementById('carbonForm');
    const carbonResult = document.getElementById('carbonResult');
    
    carbonForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const transportation = this.elements['transportation'].value;
        const diet = this.elements['diet'].value;
        const energy = this.elements['energy'].value;
        const waste = this.elements['waste'].value;
        const airTravel = this.elements['airTravel'].value;
        
        // Calculate carbon footprint (simplified algorithm)
        let carbonScore = 0;
        
        // Transportation impact
        if (transportation === 'car') carbonScore += 50;
        else if (transportation === 'carShort') carbonScore += 30;
        else if (transportation === 'publicTransport') carbonScore += 15;
        else if (transportation === 'carpool') carbonScore += 20;
        else if (transportation === 'bike') carbonScore += 0;
        
        // Diet impact
        if (diet === 'meatHeavy') carbonScore += 50;
        else if (diet === 'meatModerate') carbonScore += 35;
        else if (diet === 'vegetarian') carbonScore += 20;
        else if (diet === 'vegan') carbonScore += 10;
        
        // Energy impact
        if (energy === 'high') carbonScore += 40;
        else if (energy === 'medium') carbonScore += 25;
        else if (energy === 'low') carbonScore += 15;
        else if (energy === 'renewable') carbonScore += 5;
        
        // Waste impact
        if (waste === 'high') carbonScore += 30;
        else if (waste === 'medium') carbonScore += 20;
        else if (waste === 'low') carbonScore += 10;
        else if (waste === 'minimal') carbonScore += 2;
        
        // Air travel impact
        if (airTravel === 'frequent') carbonScore += 40;
        else if (airTravel === 'occasional') carbonScore += 20;
        else if (airTravel === 'rare') carbonScore += 5;
        else if (airTravel === 'none') carbonScore += 0;
        
        // Calculate tons of CO2
        const yearlyTonsCO2 = (carbonScore / 20).toFixed(1);
        
        // Determine impact level
        let impactLevel, impactColor;
        if (carbonScore < 50) {
            impactLevel = "Low";
            impactColor = "green";
        } else if (carbonScore < 100) {
            impactLevel = "Below Average";
            impactColor = "lightgreen";
        } else if (carbonScore < 150) {
            impactLevel = "Average";
            impactColor = "orange";
        } else {
            impactLevel = "High";
            impactColor = "red";
        }
        
        // Generate recommendations based on inputs
        const recommendations = [];
        
        if (transportation === 'car' || transportation === 'carShort') {
            recommendations.push("Consider carpooling, public transportation, or biking for shorter trips");
            recommendations.push("If possible, switch to an electric or hybrid vehicle");
        }
        
        if (diet === 'meatHeavy' || diet === 'meatModerate') {
            recommendations.push("Try having meat-free days each week");
            recommendations.push("Choose locally sourced food to reduce transportation emissions");
        }
        
        if (energy === 'high' || energy === 'medium') {
            recommendations.push("Switch to energy-efficient appliances");
            recommendations.push("Consider installing solar panels");
            recommendations.push("Use programmable thermostats to reduce unnecessary heating/cooling");
        }
        
        if (waste === 'high' || waste === 'medium') {
            recommendations.push("Start composting organic waste");
            recommendations.push("Reduce single-use plastics");
            recommendations.push("Participate in recycling programs");
        }
        
        if (airTravel === 'frequent' || airTravel === 'occasional') {
            recommendations.push("Consider video conferencing instead of business travel");
            recommendations.push("Offset your flights with carbon credits");
            recommendations.push("Combine trips to reduce frequency of air travel");
        }
        
        // Display results
        carbonResult.innerHTML = `
            <div class="text-center mb-6">
                <div class="inline-block p-4 rounded-full" style="background-color: ${impactColor}30;">
                    <i class="fas fa-leaf text-5xl" style="color: ${impactColor};"></i>
                </div>
                <h3 class="text-2xl font-bold mt-4">Your Carbon Footprint</h3>
                <p class="text-4xl font-bold mt-2" style="color: ${impactColor};">${yearlyTonsCO2} tonnes CO₂/year</p>
                <p class="mt-2">Impact Level: <span style="color: ${impactColor}; font-weight: bold;">${impactLevel}</span></p>
            </div>
            
            <div class="mt-8">
                <h4 class="font-semibold mb-4">How to Reduce Your Footprint:</h4>
                <ul class="list-disc pl-5">
                    ${recommendations.map(rec => `<li class="mb-2">${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="mt-8 p-4 bg-green-50 border border-green-200 rounded">
                <h4 class="font-semibold text-green-700 mb-2">Environmental Impact:</h4>
                <p>If everyone lived like you, we would need ${((yearlyTonsCO2 / 2) * 0.6).toFixed(1)} Earths to sustain humanity.</p>
            </div>
        `;
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const inquiryType = document.getElementById('inquiryType').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill out all required fields');
            return;
        }
        
        // In a real implementation, this would submit the form data to a server
        alert('Thank you for your message. We will get back to you soon!');
        
        // Clear form
        contactForm.reset();
    });
}

// Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    const chatbotResponses = {
        earthquake: "During an earthquake: DROP to the ground, COVER your head and neck, and HOLD ON until the shaking stops. Stay away from windows and exterior walls. If outdoors, move to a clear area away from buildings, trees, and power lines. Be prepared for aftershocks.",
        
        flood: "If there's a flood warning: Move to higher ground immediately. Avoid walking or driving through flood waters - just 6 inches of moving water can knock you down, and 1 foot can sweep your vehicle away. If trapped in a building, go to the highest level (but not into a closed attic).",
        
        population: "Population growth affects the environment in multiple ways: Increased resource consumption (water, food, energy), greater waste generation, deforestation for agriculture and housing, higher pollution levels, and habitat destruction. It also amplifies climate change impacts through higher emissions.",
        
        kit: "An emergency disaster kit should contain: Water (one gallon per person per day for several days), non-perishable food, battery-powered radio, flashlight, first aid kit, extra batteries, whistle, dust mask, plastic sheeting and duct tape, moist towelettes, garbage bags, wrench/pliers, manual can opener, local maps, cell phone with chargers and backup battery.",
        
        cyclone: "During a cyclone/hurricane: Stay indoors away from windows, skylights, and glass doors. Find a small interior room or closet on the lowest level. Cover yourself with a mattress or blankets. If the eye passes over, stay inside - the storm will resume from the opposite direction. Keep listening to emergency information.",
        
        pollution: "Air pollution increases disaster risk by weakening respiratory health, making people more vulnerable during emergencies. It also contributes to climate change, which intensifies weather-related disasters. Industrial air pollution can lead directly to chemical emergencies and contamination events.",
        
        preparation: "To prepare for disasters: 1) Create an emergency plan and share it with family, 2) Build an emergency kit with supplies for at least 3 days, 3) Stay informed about local hazards and warning systems, 4) Learn first aid and CPR, 5) Identify evacuation routes and meeting places, 6) Keep important documents in a waterproof container, 7) Practice your emergency plan regularly.",
        
        climate: "Climate change increases disaster frequency and intensity through: Rising sea levels (worse coastal flooding), higher temperatures (more heatwaves, droughts, wildfires), changing precipitation patterns (increased floods, landslides), and more powerful storms. These changes make communities more vulnerable, especially those with limited resources.",
    };
    
    let isChatbotOpen = false;
    
    chatbotToggle.addEventListener('click', function() {
        if (isChatbotOpen) {
            chatbotContainer.style.display = 'none';
        } else {
            chatbotContainer.style.display = 'flex';
        }
        isChatbotOpen = !isChatbotOpen;
    });
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Process message and respond
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('earthquake') || lowerMessage.includes('what to do during an earthquake')) {
            return chatbotResponses.earthquake;
        } else if (lowerMessage.includes('flood') || lowerMessage.includes('what to do during flood')) {
            return chatbotResponses.flood;
        } else if (lowerMessage.includes('population') || lowerMessage.includes('population explosion') || lowerMessage.includes('affects environment')) {
            return chatbotResponses.population;
        } else if (lowerMessage.includes('emergency kit') || lowerMessage.includes('disaster kit')) {
            return chatbotResponses.kit;
        } else if (lowerMessage.includes('cyclone') || lowerMessage.includes('hurricane')) {
            return chatbotResponses.cyclone;
        } else if (lowerMessage.includes('pollution') || lowerMessage.includes('air quality')) {
            return chatbotResponses.pollution;
        } else if (lowerMessage.includes('prepare') || lowerMessage.includes('preparation') || lowerMessage.includes('ready')) {
            return chatbotResponses.preparation;
        } else if (lowerMessage.includes('climate') || lowerMessage.includes('climate change')) {
            return chatbotResponses.climate;
        } else {
            return "I'm sorry, I don't have information about that yet. Try asking about earthquakes, floods, population growth, emergency kits, cyclones, pollution, disaster preparation, or climate change.";
        }
    }
    
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeroPieChart();
    initDashboardCharts();
    initPopulationSlider();
    initIndiaMap();
    initCaseStudies();
    initAnimation();
    initQuiz();
    initDisasterPredictor();
    initDisasterPlan();
    initCarbonCalculator();
    initContactForm();
    initChatbot();
});