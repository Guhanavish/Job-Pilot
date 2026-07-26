export const jobSources = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' },
  { id: 'indeed', name: 'Indeed', icon: 'indeed', color: '#2164F3' },
  { id: 'glassdoor', name: 'Glassdoor', icon: 'glassdoor', color: '#0CAA41' },
  { id: 'remoteok', name: 'RemoteOK', icon: 'remoteok', color: '#FF6B6B' },
  { id: 'stackoverflow', name: 'Stack Overflow', icon: 'stackoverflow', color: '#F48024' },
  { id: 'github', name: 'GitHub Jobs', icon: 'github', color: '#6e40c9' },
];

export const jobCategories = [
  'Software Engineering', 'Data Science', 'Design', 'Marketing',
  'Finance', 'Healthcare', 'Education', 'Sales', 'DevOps',
  'Product Management', 'Cybersecurity', 'AI & Machine Learning'
];

export const experienceLevels = [
  'Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'
];

export const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];

export const salaryRanges = [
  'Under $50K', '$50K - $80K', '$80K - $120K', '$120K - $160K', '$160K+'
];

export const jobs = [
  {
    id: 1, title: 'Senior Frontend Engineer', company: 'Google', companyId: 0,
    location: 'Mountain View, CA', remote: true, type: 'Full-time',
    experience: 'Senior', salary: '$165,000 - $210,000',
    posted: '2 days ago', applicants: 142,
    description: 'Join Google\'s core search team to build next-generation search interfaces. You\'ll work with cutting-edge web technologies and collaborate with world-class engineers to shape how billions of users find information.',
    requirements: ['React/TypeScript', 'Performance optimization', 'Web Accessibility', 'System design', '5+ years experience'],
    benefits: ['Unlimited PTO', 'Stock options', 'Health/dental/vision', '401k match', 'Learning budget'],
    source: 'linkedin', tags: ['React', 'TypeScript', 'Frontend', 'Google']
  },
  {
    id: 2, title: 'Machine Learning Engineer', company: 'Meta', companyId: 1,
    location: 'Menlo Park, CA', remote: true, type: 'Full-time',
    experience: 'Senior', salary: '$175,000 - $240,000',
    posted: '1 day ago', applicants: 89,
    description: 'Build and deploy large-scale ML models that power Meta\'s recommendation systems. Work on problems that affect billions of users across Facebook, Instagram, and WhatsApp.',
    requirements: ['Python/PyTorch', 'Large-scale ML systems', 'Deep learning', 'NLP/CV experience', 'Published research preferred'],
    benefits: ['RSUs', 'On-site amenities', 'Parental leave', 'Wellness stipend', 'Relocation assistance'],
    source: 'linkedin', tags: ['Python', 'PyTorch', 'Machine Learning', 'AI']
  },
  {
    id: 3, title: 'Product Designer', company: 'Figma', companyId: 13,
    location: 'San Francisco, CA', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$130,000 - $175,000',
    posted: '3 days ago', applicants: 203,
    description: 'Design the future of collaborative design tools. Work on features used by millions of designers worldwide, shaping how teams create and collaborate in real-time.',
    requirements: ['Strong portfolio', 'Prototyping skills', 'User research', 'Design systems', 'Figma expertise'],
    benefits: ['Flexible work', 'Learning budget', 'Home office setup', 'Team retreats', 'Equity'],
    source: 'glassdoor', tags: ['Design', 'UI/UX', 'Prototyping', 'SaaS']
  },
  {
    id: 4, title: 'Backend Engineer - Payments', company: 'Stripe', companyId: 7,
    location: 'San Francisco, CA', remote: true, type: 'Full-time',
    experience: 'Senior', salary: '$160,000 - $220,000',
    posted: '5 hours ago', applicants: 67,
    description: 'Build reliable, scalable payment infrastructure that powers millions of businesses worldwide. Work on distributed systems handling billions of dollars in transactions.',
    requirements: ['Ruby/Go/Java', 'Distributed systems', 'API design', 'Database optimization', 'Security mindset'],
    benefits: ['Competitive equity', 'Remote-friendly', 'Health benefits', 'Gym membership', 'Annual retreat'],
    source: 'indeed', tags: ['Backend', 'Ruby', 'Go', 'Payments', 'FinTech']
  },
  {
    id: 5, title: 'DevOps Lead', company: 'Netflix', companyId: 5,
    location: 'Los Gatos, CA', remote: false, type: 'Full-time',
    experience: 'Lead', salary: '$190,000 - $280,000',
    posted: '1 week ago', applicants: 45,
    description: 'Lead Netflix\'s cloud infrastructure team, ensuring 99.99% uptime for 230M+ subscribers. Design and maintain the systems that stream content globally.',
    requirements: ['AWS/GCP expertise', 'Kubernetes', 'Terraform', 'CI/CD pipelines', 'Incident management'],
    benefits: ['Top-of-market pay', 'Unlimited vacation', 'Stock options', 'Wellness fund', 'Relocation'],
    source: 'linkedin', tags: ['DevOps', 'AWS', 'Kubernetes', 'Infrastructure']
  },
  {
    id: 6, title: 'Data Scientist', company: 'Spotify', companyId: 6,
    location: 'Stockholm, Sweden', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$110,000 - $150,000',
    posted: '4 days ago', applicants: 178,
    description: 'Use data to shape how 500M+ users discover music. Build recommendation algorithms and run A/B tests that directly impact user engagement and content discovery.',
    requirements: ['Python/R', 'SQL', 'A/B testing', 'Statistical modeling', 'Machine learning'],
    benefits: ['Work from anywhere', 'Flexible hours', 'Music allowance', 'Parental leave', 'Learning budget'],
    source: 'glassdoor', tags: ['Data Science', 'Python', 'SQL', 'A/B Testing']
  },
  {
    id: 7, title: 'iOS Developer', company: 'Apple', companyId: 2,
    location: 'Cupertino, CA', remote: false, type: 'Full-time',
    experience: 'Mid Level', salary: '$145,000 - $195,000',
    posted: '6 days ago', applicants: 312,
    description: 'Build revolutionary features for iOS that will delight millions of users. Work on the next generation of mobile experiences with access to cutting-edge hardware and software.',
    requirements: ['Swift/SwiftUI', 'UIKit', 'Core Data', 'Performance tuning', 'App architecture'],
    benefits: ['Employee stock purchase', 'Health benefits', 'Product discounts', 'Education reimbursement', 'Gym'],
    source: 'stackoverflow', tags: ['iOS', 'Swift', 'SwiftUI', 'Mobile']
  },
  {
    id: 8, title: 'Security Engineer', company: 'Microsoft', companyId: 4,
    location: 'Redmond, WA', remote: true, type: 'Full-time',
    experience: 'Senior', salary: '$155,000 - $210,000',
    posted: '3 days ago', applicants: 56,
    description: 'Protect Microsoft\'s cloud infrastructure and 350M+ enterprise users. Design security solutions, respond to incidents, and build tools that keep the world\'s data safe.',
    requirements: ['Cloud security', 'Penetration testing', 'Security architecture', 'Compliance frameworks', 'Incident response'],
    benefits: ['RSUs', 'Annual bonus', 'Health/dental', '401k match', 'Sabbatical program'],
    source: 'linkedin', tags: ['Security', 'Cloud', 'Azure', 'Compliance']
  },
  {
    id: 9, title: 'Full Stack Developer', company: 'Vercel', companyId: 15,
    location: 'San Francisco, CA', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$140,000 - $185,000',
    posted: '12 hours ago', applicants: 94,
    description: 'Build the platform that powers the best frontend teams in the world. Work on Next.js, Turborepo, and the Vercel deployment platform used by millions of developers.',
    requirements: ['React/Next.js', 'Node.js', 'TypeScript', 'Edge computing', 'API design'],
    benefits: ['Remote-first', 'Home office budget', 'Learning stipend', 'Team offsites', 'Equity'],
    source: 'remoteok', tags: ['Full Stack', 'React', 'Next.js', 'TypeScript']
  },
  {
    id: 10, title: 'AI Research Scientist', company: 'DeepMind', companyId: 14,
    location: 'London, UK', remote: false, type: 'Full-time',
    experience: 'Senior', salary: '$180,000 - $250,000',
    posted: '1 week ago', applicants: 34,
    description: 'Push the boundaries of artificial intelligence. Conduct fundamental research in reinforcement learning, NLP, and computer vision that could change the world.',
    requirements: ['PhD in CS/AI', 'Published research', 'PyTorch/TensorFlow', 'Strong math background', 'Innovation mindset'],
    benefits: ['Research freedom', 'Conference travel', 'Premium benefits', 'Relocation', 'Patent bonuses'],
    source: 'stackoverflow', tags: ['AI', 'Research', 'Deep Learning', 'NLP']
  },
  {
    id: 11, title: 'Marketing Manager', company: 'Shopify', companyId: 8,
    location: 'Ottawa, Canada', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$95,000 - $130,000',
    posted: '2 days ago', applicants: 124,
    description: 'Drive growth for the world\'s leading commerce platform. Develop and execute marketing strategies that help millions of entrepreneurs build their businesses.',
    requirements: ['Growth marketing', 'Data analytics', 'Content strategy', 'Campaign management', 'B2B marketing'],
    benefits: ['Fully remote', 'Flexible schedule', 'Stock options', 'Health benefits', 'Wellness credits'],
    source: 'indeed', tags: ['Marketing', 'Growth', 'B2B', 'SaaS']
  },
  {
    id: 12, title: 'Product Manager - AI', company: 'OpenAI', companyId: 16,
    location: 'San Francisco, CA', remote: true, type: 'Full-time',
    experience: 'Senior', salary: '$200,000 - $300,000',
    posted: '1 day ago', applicants: 456,
    description: 'Lead product development for cutting-edge AI tools. Define the roadmap for products used by millions, working at the intersection of technology and user experience.',
    requirements: ['Product strategy', 'AI/ML understanding', 'User research', 'Data-driven decisions', 'Technical background'],
    benefits: ['Mission-driven work', 'Top compensation', 'Equity', 'Unlimited PTO', 'Learning budget'],
    source: 'linkedin', tags: ['Product', 'AI', 'Strategy', 'Leadership']
  },
  {
    id: 13, title: 'QA Automation Engineer', company: 'Slack', companyId: 11,
    location: 'Denver, CO', remote: true, type: 'Contract',
    experience: 'Mid Level', salary: '$90,000 - $125,000',
    posted: '5 days ago', applicants: 67,
    description: 'Ensure the reliability of communication tools used by 750,000+ organizations. Build automated testing frameworks and CI/CD pipelines.',
    requirements: ['Selenium/Cypress', 'CI/CD', 'API testing', 'Performance testing', 'Agile experience'],
    benefits: ['Remote flexibility', 'Contract-to-hire', 'Competitive rate', 'Modern stack'],
    source: 'remoteok', tags: ['QA', 'Automation', 'Testing', 'CI/CD']
  },
  {
    id: 14, title: 'Cloud Solutions Architect', company: 'Amazon', companyId: 3,
    location: 'Seattle, WA', remote: true, type: 'Full-time',
    experience: 'Lead', salary: '$170,000 - $230,000',
    posted: '4 days ago', applicants: 78,
    description: 'Design and implement cloud solutions on AWS for enterprise clients. Help Fortune 500 companies migrate and optimize their infrastructure.',
    requirements: ['AWS certifications', 'Enterprise architecture', 'Cost optimization', 'Migration strategies', 'Client management'],
    benefits: ['RSUs', 'Signing bonus', 'Relocation', 'Career development', 'Health benefits'],
    source: 'linkedin', tags: ['Cloud', 'AWS', 'Architecture', 'Enterprise']
  },
  {
    id: 15, title: 'UX Researcher', company: 'Notion', companyId: 12,
    location: 'New York, NY', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$120,000 - $160,000',
    posted: '6 days ago', applicants: 156,
    description: 'Uncover user insights that shape the future of productivity tools. Conduct research studies, usability tests, and data analysis to inform product decisions.',
    requirements: ['User research methods', 'Qualitative & quantitative', 'Survey design', 'Stakeholder communication', 'Research tools'],
    benefits: ['Remote-first', 'Learning budget', 'Health benefits', 'Home office stipend', 'Team events'],
    source: 'glassdoor', tags: ['UX', 'Research', 'User Experience', 'Product']
  },
  {
    id: 16, title: 'Blockchain Developer', company: 'Coinbase', companyId: 17,
    location: 'Remote', remote: true, type: 'Full-time',
    experience: 'Mid Level', salary: '$150,000 - $200,000',
    posted: '3 days ago', applicants: 89,
    description: 'Build decentralized financial infrastructure. Develop smart contracts and DApps that power the future of digital currency and Web3.',
    requirements: ['Solidity', 'Web3.js', 'Ethereum', 'Smart contract security', 'DeFi protocols'],
    benefits: ['Crypto bonuses', 'Remote work', 'Stock options', 'Health benefits', 'Conference budget'],
    source: 'remoteok', tags: ['Blockchain', 'Solidity', 'Web3', 'DeFi']
  },
  {
    id: 17, title: 'Technical Writer', company: 'Atlassian', companyId: 18,
    location: 'Sydney, Australia', remote: true, type: 'Full-time',
    experience: 'Entry Level', salary: '$70,000 - $95,000',
    posted: '1 week ago', applicants: 201,
    description: 'Create world-class documentation for developer tools used by millions. Write guides, tutorials, and API references that make complex technology accessible.',
    requirements: ['Technical writing', 'API documentation', 'Markdown', 'Developer empathy', 'Attention to detail'],
    benefits: ['Remote flexibility', 'Generous PTO', 'Health insurance', 'Learning budget', 'Team retreats'],
    source: 'indeed', tags: ['Writing', 'Documentation', 'Technical', 'Content']
  },
  {
    id: 18, title: 'Robotics Engineer', company: 'Tesla', companyId: 19,
    location: 'Austin, TX', remote: false, type: 'Full-time',
    experience: 'Senior', salary: '$145,000 - $200,000',
    posted: '2 days ago', applicants: 67,
    description: 'Work on the Optimus humanoid robot and autonomous driving systems. Build hardware and software that will revolutionize transportation and manufacturing.',
    requirements: ['C++/Python', 'ROS', 'Computer vision', 'Motion planning', 'Embedded systems'],
    benefits: ['Stock options', 'Free EV lease', 'On-site gym', 'Health benefits', 'Relocation'],
    source: 'linkedin', tags: ['Robotics', 'C++', 'Computer Vision', 'Embedded']
  },
  {
    id: 19, title: 'Sales Development Rep', company: 'HubSpot', companyId: 10,
    location: 'Dublin, Ireland', remote: true, type: 'Full-time',
    experience: 'Entry Level', salary: '$55,000 - $75,000',
    posted: '1 day ago', applicants: 334,
    description: 'Generate pipeline for one of the fastest-growing CRM platforms. Connect with prospects, qualify leads, and help businesses grow through HubSpot\'s platform.',
    requirements: ['Communication skills', 'CRM tools', 'Sales methodology', 'Email outreach', 'Resilience'],
    benefits: ['Commission structure', 'Remote work', 'Health benefits', 'Learning programs', 'Company trips'],
    source: 'indeed', tags: ['Sales', 'CRM', 'SaaS', 'B2B']
  },
  {
    id: 20, title: 'Head of Design', company: 'Airbnb', companyId: 9,
    location: 'San Francisco, CA', remote: true, type: 'Full-time',
    experience: 'Executive', salary: '$250,000 - $350,000',
    posted: '1 week ago', applicants: 23,
    description: 'Lead Airbnb\'s global design organization. Define the design vision and strategy for a platform used by 150M+ guests worldwide.',
    requirements: ['Design leadership', 'Team management', 'Brand strategy', 'Cross-functional collaboration', '10+ years experience'],
    benefits: ['Executive compensation', 'Stock options', 'Travel credits', 'Premium health', 'Sabbatical'],
    source: 'glassdoor', tags: ['Design', 'Leadership', 'Strategy', 'Executive']
  },
];

export const aiSuggestions = [
  { text: 'Remote frontend jobs at top tech companies', icon: 'code' },
  { text: 'Machine learning roles with $150K+ salary', icon: 'brain' },
  { text: 'Entry level positions in data science', icon: 'chart' },
  { text: 'Product management roles at startups', icon: 'rocket' },
  { text: 'DevOps engineering jobs with flexible hours', icon: 'server' },
  { text: 'UX design positions at FAANG companies', icon: 'palette' },
];

export const trendingSearches = [
  'AI Engineer', 'React Developer', 'Cloud Architect', 'Data Engineer',
  'Product Designer', 'DevOps Engineer', 'Full Stack Developer', 'Security Analyst'
];

export const stats = [
  { label: 'Active Jobs', value: '125K+' },
  { label: 'Companies', value: '8,500+' },
  { label: 'Job Seekers', value: '2.3M+' },
  { label: 'Success Rate', value: '94%' },
];
