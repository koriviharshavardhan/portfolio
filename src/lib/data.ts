export interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  headline: string;
  description: string;
  problem: string;
  solution: string;
  approach: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  demo?: string;
}

export interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  gradeLabel: string;
  gradeValue: string;
  badge: string;
  details: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export const personalInfo = {
  name: 'Korivi Harsha Vardhan',
  firstName: 'KORIVI',
  lastName: 'HARSHA VARDHAN',
  role: 'AI & Machine Learning Engineer',
  roles: [
    'AI Engineer',
    'Machine Learning Engineer',
    'Software Developer',
    'Python Developer',
    'Problem Solver',
    'Technology Enthusiast'
  ],
  tagline: 'The Future of Intelligent Engineering.',
  bio: 'Computer Science (AI & ML) graduate passionate about building intelligent software, machine learning systems, and scalable applications that solve real-world problems. Eager to apply technical skills to build innovative solutions, contribute to impactful projects, and continuously learn and grow in a forward-thinking organization.',
  email: 'koriviharshavardhan129@gmail.com',
  phone: '+91-6301821164',
  location: 'Hyderabad, Telangana, India',
  github: 'https://github.com/koriviharshavardhan',
  linkedin: 'https://www.linkedin.com/in/korivi-harsha-vardhan-87b97b2b7',
  resumeUrl: '/resume.pdf'
};

export const education: EducationItem[] = [
  {
    year: '2020',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Krishnaveni Talent School, Haliya',
    gradeLabel: 'CGPA',
    gradeValue: '9.8 / 10',
    badge: 'Excellent Academic Foundation',
    details: 'Graduated with top-tier academic honors. Cultivated early interest in mathematics, logic, and computing.'
  },
  {
    year: '2022',
    degree: 'Pre-University Course (MPC - Maths, Physics, Chemistry)',
    institution: 'Gouthami Junior College, Nalgonda',
    gradeLabel: 'Percentage',
    gradeValue: '69.2%',
    badge: 'Analytical Stream Focus',
    details: 'Completed advanced secondary education specializing in mathematics and physical sciences, building core analytical foundations.'
  },
  {
    year: '2026',
    degree: 'Bachelor of Technology (Computer Science Engineering - AI & ML)',
    institution: 'Malla Reddy College of Engineering and Technology, Hyderabad',
    gradeLabel: 'CGPA',
    gradeValue: '7.70 / 10',
    badge: 'Current Specialization Milestone',
    details: 'Studied deep learning, computer vision, database design, and software engineering. Developed hands-on projects applying artificial intelligence models to solve practical issues.'
  }
];

export const projects: Project[] = [
  {
    id: 'image-colorization',
    name: 'Image Colorization',
    category: 'Computer Vision / AI',
    status: 'Completed',
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
    difficulty: 'Advanced',
    duration: '3 Months',
    headline: 'Transforming grayscale images into vibrant color using Deep Learning.',
    description: 'Designed and trained a CNN-based model using TensorFlow and OpenCV to automate grayscale-to-color transformation. By leveraging deep networks and customized loss functions, the model learns realistic color distributions from massive visual datasets.',
    problem: 'Grayscale image colorization is an under-constrained problem. Traditional manual colorization is highly labor-intensive, requiring professional designers hours to paint a single frame. Simple color-mapping heuristics fail to capture depth, lighting, and semantics.',
    solution: 'An automated grayscale-to-color conversion pipeline using convolutional neural networks (CNNs) that extract high-level semantic features to predict the corresponding Lab color channels (specifically "a" and "b") from the luminance channel ("L").',
    approach: 'Used a deep autoencoder-like CNN structure with downsampling blocks for feature extraction and upsampling blocks with skip connections to restore resolution. Preprocessed grayscale images to extract the L channel as input and target the a and b color channels.',
    architecture: [
      'Grayscale Input (L channel, 256x256x1)',
      'Feature Extraction (CNN Encoder, downsampling layers with ReLU & Batch Normalization)',
      'Latent Space Bottleneck (High-level semantic representation)',
      'Color Prediction (CNN Decoder, upsampling layers with Transposed Convolution)',
      'Colorized Output (Predicted ab channels, 256x256x2)',
      'Reconstruction (Merge L + ab channels, convert back to RGB)'
    ],
    metrics: [
      { label: 'Accuracy', value: '85%' },
      { label: 'Framework', value: 'TensorFlow' },
      { label: 'Architecture', value: 'CNN Autoencoder' },
      { label: 'Optimizer', value: 'Adam' }
    ],
    github: 'https://github.com/koriviharshavardhan/image-colorization'
  },
  {
    id: 'academic-performance-prediction',
    name: 'Academic Performance Prediction',
    category: 'Machine Learning / Predictive AI',
    status: 'Completed',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    difficulty: 'Intermediate',
    duration: '2 Months',
    headline: 'Predicting student academic performance through Machine Learning.',
    description: 'Developed a predictive model using Scikit-learn to identify at-risk students based on historical academic, demographic, and behavioral data. Includes data cleaning, label encoding, feature scaling, and detailed visualizations.',
    problem: 'Educational institutions struggle to identify at-risk students who need extra support early in the semester. Without predictive insights, interventions are often too late, leading to lower graduation rates and higher student dropouts.',
    solution: 'A machine learning system that ingests historical student records, performs preprocessing, extracts significant predictive features, and trains classification/regression models to forecast student grades and identify at-risk profiles.',
    approach: 'Cleaned null values and outliers from student data, used Label Encoding to convert categorical fields, and applied StandardScaler for normalization. Trained multiple algorithms (Logistic Regression, Random Forest, SVM) and selected the highest-performing model based on F1-score and accuracy.',
    architecture: [
      'Raw Student Data (Demographics, Grades, Attendance)',
      'Data Preprocessing (Handling missing values, outlier removal)',
      'Feature Engineering (Label encoding, standard scaling)',
      'Model Training (Scikit-learn: Random Forest, Gradient Boosting)',
      'Evaluation & Selection (Accuracy, Precision, Recall, F1-Score)',
      'Predictions & Dashboard (Visualizing at-risk students with Matplotlib)'
    ],
    metrics: [
      { label: 'Precision', value: '82%' },
      { label: 'Framework', value: 'Scikit-learn' },
      { label: 'Primary Language', value: 'Python' },
      { label: 'Libraries', value: 'Pandas, NumPy' }
    ],
    github: 'https://github.com/koriviharshavardhan/academic-prediction'
  }
];

export const certifications: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Android AI Gen Webinar',
    issuer: 'Ryvoc Ideas Pvt Ltd',
    year: '2026',
    description: 'Webinar training on building and integrating generative AI features in mobile environments.'
  },
  {
    id: 'cert-2',
    title: 'AI/ML Certificate',
    issuer: 'Oracle',
    year: '2024',
    description: 'Professional validation of core machine learning concepts, neural networks, and Oracle AI services.'
  },
  {
    id: 'cert-3',
    title: 'Python for Everybody',
    issuer: 'Coursera',
    year: '2023',
    description: 'Comprehensive Python programming covers data structures, network programming, and databases.'
  },
  {
    id: 'cert-4',
    title: 'Data Structures Using Python',
    issuer: 'Coursera',
    year: '2023',
    description: 'Advanced study of algorithmic complexity, stacks, queues, trees, search and sort algorithms.'
  },
  {
    id: 'cert-5',
    title: 'Oracle SQL Workshop',
    issuer: 'Oracle',
    year: '2024',
    description: 'Intensive workshop on relational database schemas, complex SQL queries, and database optimization.'
  },
  {
    id: 'cert-6',
    title: 'Oracle Java Fundamentals',
    issuer: 'Oracle',
    year: '2024',
    description: 'Fundamental object-oriented programming concepts using Java: classes, inheritance, polymorphism, and exceptions.'
  }
];

export const strengths = [
  'Clean and efficient Python coding skills',
  'Hands-on experience in AI/ML projects',
  'Strong team collaboration and communication skills',
  'Quick learner who adapts easily to new technologies'
];

export const leadership = {
  title: 'Event Coordinator',
  event: 'Open Book Coding Contest (2025)',
  description: 'Managed coding environments, designed challenge problems, and coordinated logistics for 100+ participants.',
  skills: ['Leadership', 'Communication', 'Team Collaboration', 'Problem Solving']
};

export const skills = {
  languages: [
    { name: 'Python', level: 95 },
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 70 },
    { name: 'SQL', level: 85 },
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 }
  ],
  ai: [
    { name: 'Machine Learning', level: 90 },
    { name: 'Computer Vision', level: 85 },
    { name: 'CNN', level: 80 },
    { name: 'TensorFlow', level: 85 },
    { name: 'Keras', level: 80 },
    { name: 'Scikit-learn', level: 88 },
    { name: 'OpenCV', level: 82 }
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'GitHub', level: 90 },
    { name: 'VS Code', level: 95 },
    { name: 'Jupyter', level: 90 }
  ],
  concepts: [
    { name: 'Object-Oriented Programming (OOPS)', level: 90 },
    { name: 'Data Structures & Algorithms', level: 80 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Software Development', level: 85 },
    { name: 'Database Design', level: 80 },
    { name: 'Responsive Web Design', level: 85 }
  ]
};

export const personalityTraits = [
  'Analytical Thinking',
  'Problem Solving',
  'Fast Learner',
  'Team Collaboration',
  'Adaptability',
  'Creativity',
  'Continuous Learning',
  'Communication'
];
