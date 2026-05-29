/**
 * Detaylı yetenek kataloğu — kategori grupları, önerilen yetenekler ve renkler
 */

export const SKILL_GROUPS = [
  { id: 'development', label: 'Yazılım Geliştirme' },
  { id: 'ai-data', label: 'Yapay Zeka & Veri' },
  { id: 'security', label: 'Siber Güvenlik' },
  { id: 'mobile-game', label: 'Mobil & Oyun' },
  { id: 'cloud-ops', label: 'Bulut & DevOps' },
  { id: 'data-store', label: 'Veritabanları & Depolama' },
  { id: 'design', label: 'Tasarım & İçerik' },
  { id: 'business', label: 'İş, Test & Yönetim' },
  { id: 'other', label: 'Diğer' },
];

const S = (list) => list;

export const SKILL_CATALOG = [
  {
    id: 'Frontend',
    group: 'development',
    color: 'emerald',
    suggestions: S([
      'React', 'Next.js', 'Vue.js', 'Nuxt', 'Angular', 'Svelte', 'SolidJS',
      'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS',
      'Redux', 'Zustand', 'TanStack Query', 'Webpack', 'Vite', 'Web Accessibility',
      'Progressive Web Apps', 'Micro Frontends', 'Storybook', 'Jest', 'Vitest', 'Cypress',
    ]),
  },
  {
    id: 'Backend',
    group: 'development',
    color: 'cyan',
    suggestions: S([
      'Node.js', 'Express', 'NestJS', 'Fastify', 'Python', 'Django', 'FastAPI', 'Flask',
      'Java', 'Spring Boot', 'Kotlin', 'Go', 'Gin', 'Rust', 'Actix', 'PHP', 'Laravel',
      'Ruby on Rails', 'C#', '.NET Core', 'GraphQL', 'REST API', 'gRPC', 'WebSockets',
      'Message Queues', 'RabbitMQ', 'Apache Kafka', 'Redis', 'Microservices', 'Event-Driven Architecture',
    ]),
  },
  {
    id: 'Full Stack',
    group: 'development',
    color: 'teal',
    suggestions: S([
      'MERN Stack', 'MEAN Stack', 'T3 Stack', 'Django + React', 'Rails Full Stack',
      'Server Components', 'BFF Pattern', 'API Gateway', 'Monorepo', 'Turborepo', 'Nx',
    ]),
  },
  {
    id: 'Mobile — iOS',
    group: 'mobile-game',
    color: 'blue',
    suggestions: S([
      'Swift', 'SwiftUI', 'UIKit', 'Objective-C', 'Xcode', 'Core Data', 'Combine',
      'ARKit', 'HealthKit', 'Push Notifications', 'App Store Connect', 'TestFlight',
      'iOS Human Interface Guidelines', 'WidgetKit', 'CloudKit',
    ]),
  },
  {
    id: 'Mobile — Android',
    group: 'mobile-game',
    color: 'green',
    suggestions: S([
      'Kotlin', 'Java (Android)', 'Jetpack Compose', 'Android SDK', 'Material Design',
      'Room Database', 'Coroutines', 'Flow', 'Google Play Console', 'Firebase Android',
      'NDK', 'Gradle', 'ProGuard', 'Android TV', 'Wear OS',
    ]),
  },
  {
    id: 'Mobile — Cross-Platform',
    group: 'mobile-game',
    color: 'sky',
    suggestions: S([
      'React Native', 'Expo', 'Flutter', 'Dart', 'Ionic', 'Capacitor', 'Kotlin Multiplatform',
      'Xamarin', '.NET MAUI', 'PWA Mobile', 'Appium', 'Detox', 'CodePush',
    ]),
  },
  {
    id: 'Desktop',
    group: 'development',
    color: 'indigo',
    suggestions: S([
      'Electron', 'Tauri', 'Qt', 'WPF', 'WinUI', 'macOS Development', 'Linux Desktop',
      'JavaFX', 'Avalonia', '.NET Desktop',
    ]),
  },
  {
    id: 'Embedded & IoT',
    group: 'development',
    color: 'stone',
    suggestions: S([
      'C', 'C++', 'Embedded C', 'Arduino', 'Raspberry Pi', 'ESP32', 'RTOS', 'FreeRTOS',
      'MQTT', 'IoT Protocols', 'Firmware', 'ARM Cortex', 'PCB Basics', 'Sensor Integration',
    ]),
  },
  {
    id: 'Blockchain & Web3',
    group: 'development',
    color: 'amber',
    suggestions: S([
      'Solidity', 'Ethereum', 'Smart Contracts', 'Hardhat', 'Foundry', 'Web3.js', 'ethers.js',
      'DeFi', 'NFTs', 'IPFS', 'Polygon', 'Solana', 'Rust (Solana)', 'Chainlink', 'The Graph',
    ]),
  },
  {
    id: 'Data Engineering',
    group: 'ai-data',
    color: 'violet',
    suggestions: S([
      'Apache Spark', 'PySpark', 'Apache Airflow', 'dbt', 'Apache Kafka', 'Apache Flink',
      'ETL', 'ELT', 'Data Pipelines', 'Data Lake', 'Delta Lake', 'Apache Iceberg',
      'AWS Glue', 'Azure Data Factory', 'Google Dataflow', 'Databricks', 'Snowflake',
      'Apache NiFi', 'Stream Processing', 'Batch Processing', 'Data Modeling', 'Dimensional Modeling',
      'Great Expectations', 'Data Quality', 'Apache Beam', 'Trino', 'Presto',
    ]),
  },
  {
    id: 'Data Science',
    group: 'ai-data',
    color: 'purple',
    suggestions: S([
      'Python', 'Pandas', 'NumPy', 'SciPy', 'Jupyter', 'R', 'Statistics',
      'Exploratory Data Analysis', 'Hypothesis Testing', 'A/B Testing', 'Feature Engineering',
      'Scikit-learn', 'XGBoost', 'LightGBM', 'Time Series', 'Forecasting', 'Survival Analysis',
      'Bayesian Methods', 'Experimental Design', 'Data Visualization', 'Matplotlib', 'Seaborn', 'Plotly',
    ]),
  },
  {
    id: 'Machine Learning',
    group: 'ai-data',
    color: 'fuchsia',
    suggestions: S([
      'Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning',
      'Classification', 'Regression', 'Clustering', 'Ensemble Methods', 'Random Forest',
      'Gradient Boosting', 'Model Evaluation', 'Cross-Validation', 'Hyperparameter Tuning',
      'MLflow', 'Weights & Biases', 'ONNX', 'Model Deployment', 'Edge ML', 'AutoML',
    ]),
  },
  {
    id: 'Deep Learning',
    group: 'ai-data',
    color: 'pink',
    suggestions: S([
      'PyTorch', 'TensorFlow', 'Keras', 'JAX', 'Neural Networks', 'CNN', 'RNN', 'LSTM',
      'Transformers', 'Computer Vision', 'Object Detection', 'Segmentation', 'YOLO',
      'NLP', 'Speech Recognition', 'GANs', 'Diffusion Models', 'Transfer Learning',
      'CUDA', 'GPU Training', 'Distributed Training', 'Hugging Face',
    ]),
  },
  {
    id: 'Generative AI & LLM',
    group: 'ai-data',
    color: 'rose',
    suggestions: S([
      'OpenAI API', 'GPT-4', 'Claude API', 'Gemini API', 'LangChain', 'LangGraph', 'LlamaIndex',
      'RAG', 'Vector Databases', 'Pinecone', 'Weaviate', 'Chroma', 'Embeddings',
      'Prompt Engineering', 'Fine-tuning', 'LoRA', 'PEFT', 'Hugging Face Transformers',
      'Stable Diffusion', 'Midjourney API', 'AI Agents', 'Function Calling', 'Semantic Search',
      'Guardrails', 'AI Safety', 'Evaluation (LLM)', 'Ollama', 'vLLM',
    ]),
  },
  {
    id: 'MLOps',
    group: 'ai-data',
    color: 'orange',
    suggestions: S([
      'MLflow', 'Kubeflow', 'SageMaker', 'Vertex AI', 'Azure ML', 'Feature Stores', 'Feast',
      'Model Registry', 'Model Monitoring', 'Data Drift', 'A/B Testing (ML)', 'CI/CD for ML',
      'Docker (ML)', 'Kubernetes (ML)', 'BentoML', 'Seldon', 'Triton Inference Server',
    ]),
  },
  {
    id: 'BI & Analytics',
    group: 'ai-data',
    color: 'lime',
    suggestions: S([
      'SQL', 'Power BI', 'Tableau', 'Looker', 'Metabase', 'Apache Superset', 'Google Analytics',
      'Mixpanel', 'Amplitude', 'KPI Dashboards', 'ETL for Analytics', 'DAX', 'LookML',
    ]),
  },
  {
    id: 'Cybersecurity',
    group: 'security',
    color: 'red',
    suggestions: S([
      'Threat Modeling', 'Risk Assessment', 'Security Architecture', 'Zero Trust',
      'IAM', 'PKI', 'Cryptography', 'Security Awareness', 'Incident Response',
      'Digital Forensics', 'Malware Analysis', 'Threat Intelligence', 'SIEM', 'SOAR',
      'ISO 27001', 'NIST Framework', 'CIS Controls', 'Security Auditing',
    ]),
  },
  {
    id: 'Application Security',
    group: 'security',
    color: 'red',
    suggestions: S([
      'OWASP Top 10', 'Secure Coding', 'SAST', 'DAST', 'SCA', 'Dependency Scanning',
      'Secrets Management', 'Vault', 'OAuth 2.0', 'OpenID Connect', 'JWT Security',
      'API Security', 'WAF', 'Input Validation', 'XSS Prevention', 'CSRF', 'SQL Injection Prevention',
      'DevSecOps', 'Container Security', 'SBOM',
    ]),
  },
  {
    id: 'Network Security',
    group: 'security',
    color: 'orange',
    suggestions: S([
      'Firewalls', 'IDS/IPS', 'VPN', 'Network Segmentation', 'DNS Security', 'DDoS Mitigation',
      'Wireshark', 'TCP/IP', 'TLS/SSL', 'Wireless Security', 'Nmap', 'Network Monitoring',
    ]),
  },
  {
    id: 'Cloud Security',
    group: 'security',
    color: 'yellow',
    suggestions: S([
      'AWS Security', 'Azure Security', 'GCP Security', 'CSPM', 'Cloud IAM',
      'KMS', 'Security Groups', 'GuardDuty', 'Defender for Cloud', 'Security Hub',
      'Container Security', 'Serverless Security', 'CloudTrail', 'Audit Logging',
    ]),
  },
  {
    id: 'Penetration Testing',
    group: 'security',
    color: 'rose',
    suggestions: S([
      'Penetration Testing', 'Red Team', 'Burp Suite', 'Metasploit', 'Kali Linux',
      'Web App Pentest', 'Mobile Pentest', 'API Pentest', 'Social Engineering',
      'OSCP', 'CEH', 'Exploit Development', 'Bug Bounty', 'Reconnaissance',
    ]),
  },
  {
    id: 'Security Operations',
    group: 'security',
    color: 'amber',
    suggestions: S([
      'SOC Analyst', 'Splunk', 'Elastic SIEM', 'QRadar', 'Log Analysis', 'Alert Triage',
      'Playbooks', 'EDR', 'XDR', 'Threat Hunting', 'Forensics', 'Phishing Analysis',
    ]),
  },
  {
    id: 'Compliance & GRC',
    group: 'security',
    color: 'stone',
    suggestions: S([
      'GDPR', 'KVKK', 'SOC 2', 'PCI-DSS', 'HIPAA', 'ISO 27001', 'Compliance Audits',
      'Policy Writing', 'Risk Registers', 'Vendor Risk', 'Privacy by Design',
    ]),
  },
  {
    id: 'Game Engines',
    group: 'mobile-game',
    color: 'purple',
    suggestions: S([
      'Unity', 'Unreal Engine', 'Godot', 'CryEngine', 'GameMaker', 'Unity 2D/3D',
      'Unreal Blueprints', 'Unreal C++', 'Shader Graph', 'URP', 'HDRP', 'Physics Engines',
    ]),
  },
  {
    id: 'Game Programming',
    group: 'mobile-game',
    color: 'violet',
    suggestions: S([
      'C# (Unity)', 'C++ (Unreal)', 'GDScript', 'Game AI', 'Pathfinding', 'NavMesh',
      'Multiplayer', 'Netcode', 'Photon', 'Mirror', 'Dedicated Servers', 'Client-Server',
      'ECS', 'Object Pooling', 'Performance Optimization', 'Profiling', 'Console Development',
      'Steamworks', 'PlayFab', 'Game Analytics',
    ]),
  },
  {
    id: 'Game Design',
    group: 'mobile-game',
    color: 'fuchsia',
    suggestions: S([
      'Level Design', 'Game Mechanics', 'Balancing', 'Narrative Design', 'Quest Design',
      'UX (Games)', 'Monetization (F2P)', 'Live Ops', 'Prototyping', 'Paper Design',
      'Character Design', 'Economy Design', 'Onboarding', 'Retention Design',
    ]),
  },
  {
    id: '3D & Graphics',
    group: 'mobile-game',
    color: 'pink',
    suggestions: S([
      'Blender', 'Maya', '3ds Max', 'ZBrush', 'Substance Painter', 'HLSL', 'GLSL',
      'PBR Materials', 'Rigging', 'Animation', 'VFX', 'Particle Systems', 'Lighting',
      'Ray Tracing', 'Optimization (3D)', 'LOD', 'UV Mapping', 'Texturing',
    ]),
  },
  {
    id: 'UI/UX Design',
    group: 'design',
    color: 'cyan',
    suggestions: S([
      'Figma', 'Sketch', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research',
      'Usability Testing', 'Design Systems', 'Information Architecture', 'Interaction Design',
      'Accessibility (UX)', 'Mobile UX', 'Responsive Design', 'Heuristic Evaluation',
    ]),
  },
  {
    id: 'Visual Design',
    group: 'design',
    color: 'blue',
    suggestions: S([
      'Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Branding', 'Typography',
      'Color Theory', 'Icon Design', 'Logo Design', 'Print Design', 'Marketing Assets',
    ]),
  },
  {
    id: '3D & Animation',
    group: 'design',
    color: 'indigo',
    suggestions: S([
      'Cinema 4D', 'After Effects', 'Motion Graphics', 'Character Animation',
      'Rigging (Animation)', 'Rendering', 'Compositing', 'Nuke', 'DaVinci Resolve',
    ]),
  },
  {
    id: 'Video & Motion',
    group: 'design',
    color: 'violet',
    suggestions: S([
      'Premiere Pro', 'Final Cut Pro', 'Video Editing', 'Color Grading', 'Sound Design',
      'Storyboarding', 'Documentary', 'Social Media Video', 'Streaming Production',
    ]),
  },
  {
    id: 'AWS',
    group: 'cloud-ops',
    color: 'orange',
    suggestions: S([
      'EC2', 'S3', 'Lambda', 'API Gateway', 'RDS', 'DynamoDB', 'ECS', 'EKS', 'Fargate',
      'CloudFormation', 'CDK', 'IAM', 'VPC', 'Route 53', 'CloudWatch', 'SQS', 'SNS',
      'EventBridge', 'Step Functions', 'SageMaker', 'Redshift', 'Glue', 'Athena',
      'AWS Certified', 'Well-Architected Framework',
    ]),
  },
  {
    id: 'Azure',
    group: 'cloud-ops',
    color: 'blue',
    suggestions: S([
      'Azure VMs', 'Azure Functions', 'App Service', 'Azure SQL', 'Cosmos DB', 'AKS',
      'Azure DevOps', 'ARM Templates', 'Bicep', 'Azure AD', 'Key Vault', 'Blob Storage',
      'Azure Data Factory', 'Synapse', 'Azure ML', 'Microsoft Certified',
    ]),
  },
  {
    id: 'Google Cloud',
    group: 'cloud-ops',
    color: 'green',
    suggestions: S([
      'Compute Engine', 'Cloud Run', 'GKE', 'Cloud Functions', 'BigQuery', 'Cloud Storage',
      'Pub/Sub', 'Dataflow', 'Vertex AI', 'Firestore', 'Cloud SQL', 'Terraform (GCP)',
      'Google Cloud Certified',
    ]),
  },
  {
    id: 'DevOps & SRE',
    group: 'cloud-ops',
    color: 'purple',
    suggestions: S([
      'Linux', 'Bash', 'Shell Scripting', 'Git', 'GitHub Actions', 'GitLab CI', 'Jenkins',
      'Ansible', 'Puppet', 'Chef', 'Site Reliability Engineering', 'SLI/SLO', 'Error Budgets',
      'Incident Management', 'On-Call', 'Chaos Engineering', 'Capacity Planning',
      'Configuration Management', 'Release Management',
    ]),
  },
  {
    id: 'Containers & Kubernetes',
    group: 'cloud-ops',
    color: 'cyan',
    suggestions: S([
      'Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'Kustomize', 'kubectl',
      'Container Registries', 'Harbor', 'ECR', 'Service Mesh', 'Istio', 'Linkerd',
      'Pod Security', 'Network Policies', 'Operators', 'CRDs',
    ]),
  },
  {
    id: 'CI/CD',
    group: 'cloud-ops',
    color: 'teal',
    suggestions: S([
      'Continuous Integration', 'Continuous Deployment', 'GitOps', 'Argo CD', 'Flux',
      'Pipeline Design', 'Blue-Green Deployment', 'Canary Releases', 'Feature Flags',
      'SonarQube', 'Artifact Management', 'Nexus', 'Artifactory',
    ]),
  },
  {
    id: 'Infrastructure as Code',
    group: 'cloud-ops',
    color: 'emerald',
    suggestions: S([
      'Terraform', 'OpenTofu', 'Pulumi', 'AWS CDK', 'CloudFormation', 'Bicep',
      'Ansible', 'Crossplane', 'Policy as Code', 'OPA', 'Sentinel', 'Drift Detection',
    ]),
  },
  {
    id: 'Observability',
    group: 'cloud-ops',
    color: 'lime',
    suggestions: S([
      'Prometheus', 'Grafana', 'Loki', 'ELK Stack', 'Elasticsearch', 'Kibana', 'Datadog',
      'New Relic', 'OpenTelemetry', 'Jaeger', 'Zipkin', 'Distributed Tracing',
      'Log Aggregation', 'APM', 'Alerting', 'PagerDuty', 'SLO Dashboards',
    ]),
  },
  {
    id: 'Relational Databases',
    group: 'data-store',
    color: 'blue',
    suggestions: S([
      'PostgreSQL', 'MySQL', 'MariaDB', 'Microsoft SQL Server', 'Oracle', 'SQLite',
      'Database Design', 'Normalization', 'Indexing', 'Query Optimization', 'Stored Procedures',
      'Replication', 'Backup & Recovery', 'PL/pgSQL', 'T-SQL',
    ]),
  },
  {
    id: 'NoSQL Databases',
    group: 'data-store',
    color: 'green',
    suggestions: S([
      'MongoDB', 'Redis', 'Cassandra', 'CouchDB', 'DynamoDB', 'Firestore',
      'Document Modeling', 'Sharding', 'CAP Theorem', 'Event Sourcing', 'CQRS',
    ]),
  },
  {
    id: 'Data Warehousing',
    group: 'data-store',
    color: 'violet',
    suggestions: S([
      'Snowflake', 'BigQuery', 'Redshift', 'Synapse', 'Databricks SQL', 'Star Schema',
      'Slowly Changing Dimensions', 'ETL to Warehouse', 'dbt', 'Data Marts',
    ]),
  },
  {
    id: 'Search & Caching',
    group: 'data-store',
    color: 'amber',
    suggestions: S([
      'Elasticsearch', 'OpenSearch', 'Solr', 'Redis', 'Memcached', 'CDN',
      'Full-Text Search', 'Vector Search', 'Cache Strategies', 'Session Stores',
    ]),
  },
  {
    id: 'QA & Test Automation',
    group: 'business',
    color: 'yellow',
    suggestions: S([
      'Manual Testing', 'Test Plans', 'Selenium', 'Playwright', 'Cypress', 'JUnit', 'pytest',
      'API Testing', 'Postman', 'k6', 'JMeter', 'Load Testing', 'Performance Testing',
      'TDD', 'BDD', 'Cucumber', 'TestRail', 'Regression Testing', 'Mobile Testing',
    ]),
  },
  {
    id: 'Agile & Scrum',
    group: 'business',
    color: 'orange',
    suggestions: S([
      'Scrum', 'Kanban', 'SAFe', 'Sprint Planning', 'Retrospectives', 'Backlog Refinement',
      'Jira', 'Confluence', 'User Stories', 'Estimation', 'Agile Coaching',
    ]),
  },
  {
    id: 'Product Management',
    group: 'business',
    color: 'pink',
    suggestions: S([
      'Product Discovery', 'Roadmapping', 'PRD Writing', 'Prioritization', 'RICE', 'MoSCoW',
      'Stakeholder Management', 'Metrics', 'North Star Metric', 'A/B Testing (Product)',
      'Competitive Analysis', 'Go-to-Market',
    ]),
  },
  {
    id: 'Project Management',
    group: 'business',
    color: 'rose',
    suggestions: S([
      'Waterfall', 'Hybrid PM', 'MS Project', 'Asana', 'Monday.com', 'Risk Management',
      'Resource Planning', 'Gantt Charts', 'PMBOK', 'Prince2',
    ]),
  },
  {
    id: 'Soft Skills',
    group: 'business',
    color: 'fuchsia',
    suggestions: S([
      'İletişim', 'Takım Çalışması', 'Liderlik', 'Problem Çözme', 'Kritik Düşünme',
      'Zaman Yönetimi', 'Mentorluk', 'Sunum Becerileri', 'Müzakere', 'Empati',
      'Çatışma Yönetimi', 'Adaptasyon', 'Öğrenmeye Açıklık', 'İngilizce', 'Almanca',
    ]),
  },
  {
    id: 'ERP & Enterprise',
    group: 'other',
    color: 'stone',
    suggestions: S([
      'SAP', 'Oracle ERP', 'Microsoft Dynamics', 'Salesforce', 'ServiceNow',
      'Workday', 'NetSuite', 'Integration (Enterprise)',
    ]),
  },
  {
    id: 'CMS & E-commerce',
    group: 'other',
    color: 'zinc',
    suggestions: S([
      'WordPress', 'Shopify', 'WooCommerce', 'Magento', 'Headless CMS', 'Contentful',
      'Strapi', 'Sanity', 'SEO', 'Payment Gateways', 'Stripe',
    ]),
  },
  {
    id: 'Networking & Systems',
    group: 'other',
    color: 'slate',
    suggestions: S([
      'TCP/IP', 'DNS', 'HTTP/HTTPS', 'Load Balancing', 'NGINX', 'Apache',
      'Active Directory', 'Windows Server', 'Linux Administration', 'Virtualization', 'VMware',
      'Storage Systems', 'Backup', 'Disaster Recovery', 'High Availability',
    ]),
  },
  {
    id: 'Programming Languages',
    group: 'other',
    color: 'gray',
    suggestions: S([
      'Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'C++', 'C', 'Go', 'Rust',
      'Ruby', 'PHP', 'Swift', 'Kotlin', 'Scala', 'R', 'MATLAB', 'Haskell', 'Elixir',
      'Assembly', 'COBOL', 'Fortran',
    ]),
  },
  {
    id: 'Tools & Platforms',
    group: 'other',
    color: 'neutral',
    suggestions: S([
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'VS Code', 'IntelliJ IDEA', 'Postman',
      'Notion', 'Slack', 'Discord', 'Linear', 'Figma Dev Mode', 'npm', 'yarn', 'pnpm',
      'Docker Hub', 'NPM Registry',
    ]),
  },
  {
    id: 'Other',
    group: 'other',
    color: 'gray',
    suggestions: S([]),
  },
  // Eski kategoriler — geriye dönük uyumluluk
  {
    id: 'Database',
    group: 'data-store',
    color: 'blue',
    suggestions: S(['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQL']),
    legacy: true,
  },
  {
    id: 'DevOps',
    group: 'cloud-ops',
    color: 'purple',
    suggestions: S(['Docker', 'Kubernetes', 'CI/CD', 'Terraform']),
    legacy: true,
  },
  {
    id: 'Tools',
    group: 'other',
    color: 'yellow',
    suggestions: S(['Git', 'Jira', 'VS Code']),
    legacy: true,
  },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  SKILL_CATALOG.map((c) => [c.id, c])
);

export const CATEGORY_ORDER = SKILL_CATALOG.filter((c) => !c.legacy).map((c) => c.id);

const TAILWIND_COLOR_CLASSES = {
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/30',
  teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30 hover:bg-teal-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30',
  green: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
  sky: 'bg-sky-500/20 text-sky-400 border-sky-500/30 hover:bg-sky-500/30',
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/30',
  stone: 'bg-stone-500/20 text-stone-400 border-stone-500/30 hover:bg-stone-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30 hover:bg-violet-500/30',
  purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30',
  fuchsia: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30 hover:bg-rose-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30',
  yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
  lime: 'bg-lime-500/20 text-lime-400 border-lime-500/30 hover:bg-lime-500/30',
  red: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
  zinc: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30 hover:bg-zinc-500/30',
  slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-slate-500/30',
  gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30',
  neutral: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30 hover:bg-neutral-500/30',
};

export function getCategoryPillClass(categoryId) {
  const color = CATEGORY_BY_ID[categoryId]?.color || 'gray';
  return TAILWIND_COLOR_CLASSES[color] || TAILWIND_COLOR_CLASSES.gray;
}

export function getActiveCategories() {
  return SKILL_CATALOG.filter((c) => !c.legacy);
}

export function getSuggestionsForCategory(categoryId) {
  return CATEGORY_BY_ID[categoryId]?.suggestions || [];
}

export function sortCategoryKeys(categoryKeys) {
  const order = new Map(CATEGORY_ORDER.map((id, i) => [id, i]));
  return [...categoryKeys].sort((a, b) => {
    const ia = order.has(a) ? order.get(a) : 999;
    const ib = order.has(b) ? order.get(b) : 999;
    if (ia !== ib) return ia - ib;
    return a.localeCompare(b, 'tr');
  });
}

export function skillExists(skills, category, name) {
  const n = name.trim().toLowerCase();
  return (skills || []).some(
    (s) => s.category === category && s.name.trim().toLowerCase() === n
  );
}
