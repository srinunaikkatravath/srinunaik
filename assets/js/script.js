// ==========================================================================
// SRINU NAIK KATRAVATH — FULL 3D CSE DEVELOPER PORTFOLIO ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Theme Management (Colorful Light by default, with dark toggle)
    const themeToggleBtn = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('srinu_theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('srinu_theme', isDark ? 'dark' : 'light');
            themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            updateThreeColors(isDark);
        });
    }

    // 3. Mobile Navigation Menu
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 4. Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Scroll Spy Navigation Highlight
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (link) link.classList.add('active');
            } else {
                if (link) link.classList.remove('active');
            }
        });
    });

    // 6. Typed.js Initialization
    if (typeof Typed !== 'undefined' && document.querySelector('.typing-text')) {
        new Typed('.typing-text', {
            strings: [
                'Full Stack Developer',
                'AI / ML & GenAI Engineer',
                'Spring Boot & REST API Specialist',
                'ThreatLens AI System Architect',
                'UGC-Published Author'
            ],
            loop: true,
            typeSpeed: 45,
            backSpeed: 25,
            backDelay: 1200
        });
    }

    // 7. Project Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 8. 3D Card Specular Hover & Perspective Tilt
    const tiltCards = document.querySelectorAll('.glass-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update specular highlight position
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 9. Interactive 3D Developer Studio Code Tabs
    const studioTabs = document.querySelectorAll('.tab-btn');
    const codeDisplays = document.querySelectorAll('.code-display');

    studioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            studioTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const fileTarget = tab.getAttribute('data-file');
            codeDisplays.forEach(display => {
                if (display.getAttribute('id') === fileTarget) {
                    display.classList.add('active');
                } else {
                    display.classList.remove('active');
                }
            });
        });
    });

    // 10. Executable Developer CLI Terminal
    const terminalInput = document.getElementById('terminalInput');
    const terminalLogs = document.getElementById('terminalLogs');

    if (terminalInput && terminalLogs) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Append user input
                appendTerminalLine(`visitor@srinunaik:~$ ${command}`, 't-prompt');

                // Execute command
                switch (command) {
                    case 'help':
                        appendTerminalLine('Available commands:\n  whoami      - Display developer bio & role\n  skills      - View technical arsenal\n  projects    - List top featured projects\n  exp         - View work and research experience\n  pub         - View UGC-listed publication\n  contact     - View phone, email & socials\n  clear       - Clear terminal logs', 't-output');
                        break;
                    case 'whoami':
                    case 'about':
                        appendTerminalLine('Srinu Naik Katravath\nFull Stack Developer & AI/ML Researcher\nPursuing M.Tech (CSE) @ JNTUACEP\nLocation: Andhra Pradesh, India', 't-output');
                        break;
                    case 'skills':
                        appendTerminalLine('Core Stack:\n• Java, Spring Boot, REST APIs, MySQL, JDBC\n• Python, FastAPI, Next.js 14, PyTorch\n• QLoRA, FAISS, MediaPipe, OpenCV\n• Oracle Cloud (OCI AI), AWS Cloud Essentials', 't-output');
                        break;
                    case 'projects':
                        appendTerminalLine('Featured Projects:\n1. ThreatLens AI (Multi-modal threat detection)\n2. Next Afield (Agri-tech digital platform)\n3. BioAgents (Bioinformatics QA system)\n4. Gesture Controller Virtual Mouse (UGC Published)\n5. Student Attendance Management System\n(34+ public repos available on GitHub)', 't-output');
                        break;
                    case 'exp':
                        appendTerminalLine('Experience Timeline:\n• AI Intern @ Infosys Springboard (ThreatLens AI)\n• PG Research Intern @ IIITDM Kurnool (BioAgents)\n• Full Stack Trainee @ KodNest (500+ hrs, Java/Spring)\n• Founder & CEO @ Next Afield (Agro-platform)', 't-output');
                        break;
                    case 'pub':
                    case 'publication':
                    case 'research':
                        appendTerminalLine('Research Publication:\nGesture Controller Virtual Mouse\nJournal of Nonlinear Analysis and Optimization (JNAO)\nVol. 15, Issue 1, 2024 · ISSN: 1906-9685 · UGC-Listed', 't-output');
                        break;
                    case 'contact':
                        appendTerminalLine('Contact Coordinates:\n• Email: katravath11143@gmail.com\n• Phone: +91 9618231306\n• LinkedIn: linkedin.com/in/srinunaikkatravath\n• GitHub: github.com/srinunaikkatravath', 't-output');
                        break;
                    case 'clear':
                        terminalLogs.innerHTML = '';
                        break;
                    case '':
                        break;
                    default:
                        appendTerminalLine(`Command not found: "${command}". Type "help" for a list of valid commands.`, 't-output');
                        break;
                }

                terminalLogs.scrollTop = terminalLogs.scrollHeight;
            }
        });
    }

    function appendTerminalLine(text, className) {
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        line.style.whiteSpace = 'pre-wrap';
        terminalLogs.appendChild(line);
    }

    // 11. Contact Form AJAX Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtnOriginalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerHTML = '<span style="color: #059669; font-weight: 800;"><i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.</span>';
                    contactForm.reset();
                } else {
                    formStatus.innerHTML = '<span style="color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Submission failed. Please email katravath11143@gmail.com directly.</span>';
                }
            } catch (err) {
                formStatus.innerHTML = '<span style="color: #ef4444;"><i class="fas fa-exclamation-circle"></i> Network error. Please email katravath11143@gmail.com directly.</span>';
            } finally {
                submitBtn.innerHTML = submitBtnOriginalHTML;
                submitBtn.disabled = false;
            }
        });
    }

    // 12. Tab Focus Visibility Change
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            document.title = 'Srinu Naik Katravath | Full Stack Developer & AI/ML Researcher';
        } else {
            document.title = '🚀 Exploring Opportunities? Connect with Srinu Naik';
        }
    });

    // ==========================================================================
    // 13. THREE.JS 3D WEBGL INTERACTIVE CYBER BACKGROUND
    // ==========================================================================
    let scene, camera, renderer, cyberMesh, torusMesh, particleSystem;
    let targetRotationX = 0, targetRotationY = 0;
    let mouseX = 0, mouseY = 0;
    const canvasContainer = document.getElementById('three-canvas-container');

    if (typeof THREE !== 'undefined' && canvasContainer) {
        initThreeJS();
    }

    function initThreeJS() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 28;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);

        // 3D Ambient & Directional Neon Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x4f46e5, 2, 80);
        pointLight1.position.set(20, 20, 20);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00f5d4, 1.8, 80);
        pointLight2.position.set(-20, -20, 15);
        scene.add(pointLight2);

        // Central Cyber Geometric Mesh (Icosahedron Wireframe with vertices)
        const geometry = new THREE.IcosahedronGeometry(11, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4f46e5,
            wireframe: true,
            transparent: true,
            opacity: 0.28
        });
        cyberMesh = new THREE.Mesh(geometry, material);
        cyberMesh.position.set(16, 2, -5);
        scene.add(cyberMesh);

        // Surrounding 3D Torus Ring
        const torusGeo = new THREE.TorusGeometry(14, 0.35, 16, 100);
        const torusMat = new THREE.MeshStandardMaterial({
            color: 0x00f5d4,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        torusMesh = new THREE.Mesh(torusGeo, torusMat);
        torusMesh.position.set(16, 2, -5);
        scene.add(torusMesh);

        // 3D Neural Particle Constellation
        const particleCount = 280;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 90;
            positions[i + 1] = (Math.random() - 0.5) * 70;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMat = new THREE.PointsMaterial({
            color: 0x7928ca,
            size: 0.55,
            transparent: true,
            opacity: 0.6
        });

        particleSystem = new THREE.Points(particleGeo, particleMat);
        scene.add(particleSystem);

        // Mouse Parallax Listener
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animateThree();
    }

    function animateThree() {
        requestAnimationFrame(animateThree);

        if (cyberMesh && torusMesh) {
            cyberMesh.rotation.x += 0.003;
            cyberMesh.rotation.y += 0.004;

            torusMesh.rotation.x += 0.002;
            torusMesh.rotation.y += 0.005;

            // Smooth mouse follow easing
            cyberMesh.rotation.x += (mouseY - cyberMesh.rotation.x) * 0.05;
            cyberMesh.rotation.y += (mouseX - cyberMesh.rotation.y) * 0.05;
        }

        if (particleSystem) {
            particleSystem.rotation.y += 0.0006;
            particleSystem.rotation.x += 0.0004;
        }

        renderer.render(scene, camera);
    }

    function updateThreeColors(isDark) {
        if (!cyberMesh) return;
        if (isDark) {
            cyberMesh.material.color.setHex(0x00f5d4);
            cyberMesh.material.opacity = 0.35;
            torusMesh.material.color.setHex(0x7928ca);
            particleSystem.material.color.setHex(0x00f5d4);
        } else {
            cyberMesh.material.color.setHex(0x4f46e5);
            cyberMesh.material.opacity = 0.28;
            torusMesh.material.color.setHex(0x00f5d4);
            particleSystem.material.color.setHex(0x7928ca);
        }
    }
});