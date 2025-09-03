<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Chimbay/SocialCueWebapp">
    <img src="/src/images/cue.svg" alt="Logo" width="40%" height="auto">
  </a>

<h3 align="center">CUE - Clear Understanding of Emotion</h3>

  <p align="center">
    A web application that enhances emotional intelligence in children with Autism Spectrum Disorder through facial recognition technology
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#approach">Approach</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#research-background">Research Background</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

**CUE (Clear Understanding of Emotion)** is a research-based web application designed to help children with Autism Spectrum Disorder (ASD) improve their emotional intelligence through interactive facial recognition technology. The application provides a safe, engaging environment where children can practice identifying and expressing emotions using real-time facial analysis.

### Key Features

- **Facial Recognition Technology**: Real-time emotion detection using MediaPipe Face Landmarker
- **Interactive Story Scenarios**: Engaging narratives that teach emotional recognition in context
- **Confidence-Based Algorithm**: Machine learning model that weights facial features to determine emotion confidence levels
- **Child-Friendly Interface**: Designed specifically for accessibility and engagement with children with ASD
- **Progress Tracking**: Monitor emotional intelligence development over time

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Motivation

Children with Autism Spectrum Disorder often struggle with emotional intelligence, facing challenges in:
- Understanding and interpreting social cues
- Expressing and regulating emotions appropriately
- Recognizing emotions in themselves and others
- Navigating social interactions effectively

Our research aims to bridge this gap by:
- **Integrating Advanced Technology**: Utilizing machine learning and facial recognition for interactive learning
- **Focusing on Exteroception**: Helping children understand the external world rather than just fictional scenarios
- **Applying Research-Based Methods**: Implementing the 8 Pillars X 8 Layers Model of Metacognition for comprehensive sensory processing support

## Approach

Our application draws inspiration from existing research and applications like EmoTEA, while focusing on exteroception (awareness of the external world). We utilize:

1. **Facial Recognition Software**: To help children match facial expressions to emotional cues
2. **Interactive Scenarios**: Real-world social situations that children can practice with
3. **Confidence-Based Feedback**: Algorithm that provides supportive guidance based on emotional recognition accuracy
4. **Progressive Learning**: Structured approach from basic emotion recognition to complex social scenarios

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![HTML5][HTML5]][HTML-url]
* [![CSS3][CSS3]][CSS-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![MediaPipe][MediaPipe]][MediaPipe-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- A modern web browser with camera access support
- Local web server (optional, for development)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Chimbay/SocialCueWebapp.git
   ```

2. Navigate to the project directory
   ```sh
   cd SocialCueWebapp
   ```

3. Open the project in your preferred code editor

4. Ensure you install dependencies
    ```sh
   npm install
   ```

5. Launch the application
   ```sh
   # If using a local server (recommended)
   python -m http.server 8000
   # or
   npx run dev
   
   # Then visit http://localhost:8000 in your browser
   ```

6. Allow camera permissions when prompted for facial recognition features

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### For Children with ASD
1. **Start with Story Mode**: Choose from various emotional scenarios (Happy, Sad, Excited, Angry)
2. **Practice Facial Recognition**: Use the camera feature to practice making different emotional expressions
3. **Receive Real-Time Feedback**: Get confidence-based feedback on emotional expression accuracy
4. **Progress Through Levels**: Advance from basic emotion recognition to complex social scenarios

### For Educators and Parents
- Monitor progress through the application's tracking features
- Use scenarios as teaching tools for emotional intelligence development
- Encourage practice in a safe, supportive digital environment

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Research Background

This project is based on extensive research conducted at Borough of Manhattan Community College under Dr. Mohammad Azhar's supervision. Our research findings include:

### Key Research Insights
- Children with ASD benefit from technology-assisted emotional intelligence training
- Facial recognition technology can effectively support emotion recognition learning
- Interactive, visual applications with animations engage children with ASD more effectively
- The 8 Pillars X 8 Layers Model of Metacognition provides a comprehensive framework for sensory processing support

### Research Publications
- Presented at LSAMP Research Symposium
- Published research journal documenting development progress
- Ongoing data collection and algorithm refinement

### Algorithm Development
Our confidence-based algorithm analyzes:
- Eyebrow positioning and movement
- Eye squinting patterns from cheek elevation
- Smile detection and mouth positioning
- Overall facial feature coordination

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

### Current Features
- [x] Basic facial recognition implementation
- [x] Interactive story scenarios for multiple emotions
- [x] Confidence-based emotion detection algorithm
- [x] Responsive web interface
- [x] Shared navigation system

### Future Enhancements
- [ ] **Efficient Database Design**: Implement relational database for user progress tracking
- [ ] **Continuous Model Training**: Pipeline for ongoing algorithm improvement
- [ ] **Enhanced Interactivity**: Custom camera designs, gamification elements
- [ ] **Accessibility Features**: High contrast mode, resizable text, text-to-speech
- [ ] **Extended Content**: Additional emotions, more complex scenarios
- [ ] **Mobile Application**: Native mobile app development
- [ ] **Multilingual Support**: Support for multiple languages


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributors

Contributions are what make the open source community such an amazing place to learn, inspire, and create.

<a href="https://github.com/Chimbay/SocialCueWebapp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Chimbay/SocialCueWebapp" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Research Support  

LSAMP (Louis Stokes Alliance for Minority Participation)  
Dr. Mohammad Q. Azhar — Faculty Mentor  
CUNY Borough of Manhattan Community College — CIS Department  

---

## Technology & Software  

MediaPipe Contributors — Face Landmarker Technology (2024). Retrieved from https://github.com/google-ai-edge/mediapipe
MediaPipe Authors — Apache License, Version 2.0. Retrieved from http://www.apache.org/licenses/LICENSE-2.0  

---

## Research References  

Centers for Disease Control and Prevention. "What Is Autism Spectrum Disorder?" CDC, 9 Dec. 2022, www.cdc.gov/ncbddd/autism/facts.html  

McConnell, Scott R. "Interventions to Facilitate Social Interaction for Young Children with Autism: Review of Available Research and Recommendations for Educational Intervention and Future Research." *Journal of Autism and Developmental Disorders*, vol. 32, no. 5, Oct. 2002, pp. 351–372. https://doi.org/10.1023/a:1020537805154  

McGee, G. G., Feldman, R. S., & Morrier, M. J. (1997). "Benchmarks of social treatment for children with autism." *Journal of Autism & Developmental Disorders*, 27, 353–364.  

Trevisan, Dominic A., et al. "Considerations about how emotional intelligence can be enhanced in children with autism spectrum disorder." *Frontiers in Education*, vol. 6, 15 Apr. 2021. https://doi.org/10.3389/feduc.2021.639736  

Mayer, J. D., & Salovey, P. (1997). "What is emotional intelligence?" In *Emotional development and emotional intelligence: educational implications*, eds. P. Salovey & D. J. Sluyter (New York, NY: Basic Books), 3–34.  

Richburg, Melanie, and Teresa Fletcher. "Emotional intelligence: directing a child's emotional education." *Child Study Journal*, vol. 32, no. 1, Mar. 2002, pp. 31+. Gale OneFile: Health and Medicine, https://link.gale.com/apps/doc/A93657295/HRCA  

Kato, K. (2019). "Employing tabletop role-playing games (TRPGs) in social communication support measures for children and youth with autism spectrum disorder (ASD) in Japan: a hands-on report on the use of leisure activities." *Jpn. J. Analog Role Playing Game Stud.*, 23–28.  

Garcia-Garcia, Jose Maria, et al. "Emotea." *Proceedings of the XX International Conference on Human Computer Interaction*, 25 June 2019. https://doi.org/10.1145/3335595.3335639  

Drigas, Athanasios, and Eleni Mitsea. "8 pillars x 8 layers model of metacognition: Educational strategies, exercises & trainings." *International Journal of Online and Biomedical Engineering (iJOE)*, vol. 17, no. 08, 16 Aug. 2021. https://doi.org/10.3991/ijoe.v17i08.23563  


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Chimbay/SocialCueWebapp.svg?style=for-the-badge
[contributors-url]: https://github.com/Chimbay/SocialCueWebapp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Chimbay/SocialCueWebapp.svg?style=for-the-badge
[forks-url]: https://github.com/Chimbay/SocialCueWebapp/network/members
[stars-shield]: https://img.shields.io/github/stars/Chimbay/SocialCueWebapp.svg?style=for-the-badge
[stars-url]: https://github.com/Chimbay/SocialCueWebapp/stargazers
[issues-shield]: https://img.shields.io/github/issues/Chimbay/SocialCueWebapp.svg?style=for-the-badge
[issues-url]: https://github.com/Chimbay/SocialCueWebapp/issues
[license-shield]: https://img.shields.io/github/license/Chimbay/SocialCueWebapp.svg?style=for-the-badge
[license-url]: https://github.com/Chimbay/SocialCueWebapp/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/anthony-chimbay
[product-screenshot]: images/screenshot.png
[HTML5]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[MediaPipe]: https://img.shields.io/badge/MediaPipe-00599C?style=for-the-badge&logo=google&logoColor=white
[MediaPipe-url]: https://github.com/mediapipe/face_landmark_web
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
