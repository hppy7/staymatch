# StayMatch – Lifestyle Compatibility Engine for Shared Living

## 🎥 Demo Video
[![Watch Demo](https://img.youtube.com/vi/HAQ2HPi6gWs/0.jpg)](https://youtu.be/HAQ2HPi6gWs)

## 📸 Screenshots

![Login_Page](images/Login_Page.png)

![Dashboard](images/Dashboard.png)

![Compatibility_Check](images/Compatibility_Check.png)

![Conflict_Check](images/Conflict_Check.png)

![Smart_Chores](images/Task_Chores.png)

![Agreement](images/Agreement.png)

StayMatch is an **open-source lifestyle compatibility engine** designed to help students and working professionals find compatible roommates before sharing accommodation.

The system evaluates lifestyle preferences and predicts **compatibility scores and potential conflict risks**, enabling smarter roommate matching.

## 🚀 Key Features

- 🧠 Lifestyle Compatibility Matching  
- ⚠️ Conflict Risk Prediction  
- 🧹 Smart Chore Allocation  
- 📄 Auto Roommate Agreement Generator  
- 📊 Interactive Dashboard & Analytics  

---

## Table of Contents
 
- [Problem Statement](#problem-statement)
- [Current Solution](#current-solution)
- [Project Goals and Milestones](#project-goals-and-milestones)
- [Project Approach](#project-approach)
- [System Features](#system-features)
- [Technology Stack](#technology-stack)
- [Backend Architecture](#backend-architecture)
- [Repository Structure](#repository-structure)
- [Project Outcomes](#project-outcomes)
- [Future Improvements](#future-improvements)
- [Assumptions](#assumptions)
- [References](#references)
---

# Problem Statement

In urban environments, students and working professionals frequently relocate for education and employment. While accommodation discovery has become easier through digital platforms, roommate allocation remains largely compatibility-blind.

Differences in lifestyle habits such as:

Sleep schedule
Cleanliness standards
Study habits
Noise tolerance
Smoking preferences
Social behavior
often lead to conflicts between roommates.

Most existing accommodation platforms focus only on room availability, not lifestyle compatibility.

This results in:

Frequent roommate conflicts
Reduced productivity
Mental stress
Financial disagreements
Early termination of accommodation agreements
Therefore, there is a need for a structured compatibility evaluation system that predicts lifestyle alignment before roommates are assigned.

---

# Current Solution

Currently, people find roommates using:

- Local brokers
- Social media groups
- Word-of-mouth referrals
- Random hostel allocation
- Rental listing platforms

These methods consider only:

- Vacancy availability
- Gender
- Budget
- Basic preferences

They **do not evaluate lifestyle compatibility**, which leads to conflicts after roommates start living together.

---

# Project Goals and Milestones

## General Goals

- Build a **modular open-source compatibility engine**
- Implement **configurable compatibility scoring**
- Predict **conflict risk before roommate allocation**
- Provide **smart roommate recommendations**
- Generate **digital roommate agreements**
- Provide **visual analytics of lifestyle compatibility**

## Milestones

### Phase 1 – Core Architecture
- Requirement analysis
- Database schema design
- Backend API structure
- User preference models

### Phase 2 – Compatibility Engine
- Weighted compatibility scoring
- JSON-based weight configuration
- Conflict risk classification

### Phase 3 – Integration Layer
- Roommate agreement generator
- Frontend match visualization
- Radar chart compatibility analytics

### Phase 4 – Open Source Readiness
- Code modularization
- Documentation
- API documentation
- Testing and deployment

---

# Project Approach

### 1. Requirement Analysis
Identify measurable lifestyle parameters:

- Sleep schedule
- Cleanliness
- Smoking preference
- Study habits
- Noise tolerance
- Personality traits

---

### 2. Modular Architecture

System designed with:

- Node.js backend
- MongoDB database
- Modular folder structure
- Scalable API design

---

### 3. Compatibility Engine

Features include:

- Weighted scoring algorithm
- Configurable weight parameters
- Compatibility score normalization
- Transparent match explanations

---

### 4. Conflict Prediction

Roommates classified as:

- Low Risk
- Moderate Risk
- High Risk

Based on rule-based mismatch detection.

---

### 5. Visualization and Agreements

- Radar chart comparison of lifestyle parameters
- Digital roommate agreement generation
- Shared living rule documentation

---

# System Features

StayMatch provides intelligent, AI-driven features to enable compatibility-based roommate matching and reduce conflicts in shared living environments.

🧠 Core Features

- Lifestyle Compatibility Matching
  
  Evaluates users based on lifestyle parameters such as sleep cycle, cleanliness, noise tolerance, and social behavior to generate compatibility insights.

- Conflict Risk Prediction Engine
  
  Predicts potential roommate conflicts using rule-based analysis and categorizes matches into Low, Medium, and High Risk.

- Smart Chore Allocation System
  
  AI-based chore distribution using:

    - Difficulty weighting
      
    - Cleanliness preference balancing
      
    - Weekly rotation system
      
    - Fairness score calculation
      
- Agreement Architect (Auto Contract Generator)
  
  Automatically generates structured roommate agreements based on:

    - Rent details
      
    - Rules & responsibilities
      
    - Lifestyle preferences
      
📊 Visualization & Insights

- Workload Distribution Visualization
  
 Interactive Pie Chart (Chart.js) showing chore distribution between roommates.
 
- Fairness Meter
  
 Displays balance in workload assignment with dynamic visual feedback.

- Final Match Verdict System
  
  Combines:
   - Compatibility Score
     
   - Conflict Risk
     
   - Chore Fairness
     
       → to generate a final recommendation:
     
   - Ideal Match
     
   - Good Match
     
   - Not Recommended

⚡User Experience Features
     
- Interactive Dashboard UI (Bento Grid Design)
  
  Modern glassmorphism-based dashboard for seamless navigation.
 
- Typewriter AI Feedback System
  
  Dynamic AI-generated outputs with real-time typing animation.
 
- Downloadable Outputs
  
Users can download:

  - Agreements
    
  - Chore Plans
  
- Local Storage-Based Session Handling
  
  Maintains user state without complex backend auth flow.

🔧 Functional Features
- REST API Backend Integration
  Modular API system for:
  - Matching
  - Conflict prediction
  - Agreement generation
  - Chore allocation
- Extensible Rule-Based Engine
  Easily upgradable to ML-based models in future.

---

# Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Chart.js

## Backend

- Node.js
- Express.js

## Database

- MongoDB (for storing user data & preferences)
- Mongoose (schema & data modeling)

## Authentication

- JSON Web Tokens (JWT)
- bcrypt.js

## Development Tools

- Visual Studio Code
- Git & GitHub
- Postman

---
## Backend Architecture

The backend follows a modular architecture.

```
backend/
│
├── models
├── controllers
├── routes
├── config
└── server.js
```

- **Models** – Database schema definitions  
- **Controllers** – Business logic  
- **Routes** – API endpoints  
- **Config** – Database configuration  
- **server.js** – Main application entry point  



---
## Repository Structure

```
StayMatch/
│
├── backend/
│   │
│   ├── dataset/
│   │   └── staymatch_lifestyle_dataset.csv
│   │
│   ├── models/
│   │   ├── feedback.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── agreement.js
│   │   ├── authRoutes.js
│   │   ├── choresRoutes.js
│   │   ├── conflictRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── matchRoutes.js
│   │
│   ├── compatibility-engine/
│   │   ├── compatibility.js
│   │   └── weights.json
│   │
│   ├── .env
│   ├── seed.js
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   ├── agreement.html
│   │   ├── agreement.css
│   │   ├── agreement.js
│   │   │
│   │   ├── conflict.html
│   │   ├── conflict.css
│   │   ├── conflict.js
│   │   │
│   │   ├── dashboard.html
│   │   ├── dashboard_style.css
│   │   ├── dashboard_script.js
│   │   │
│   │   ├── feedback.html
│   │   ├── feedback.css
│   │   │
│   │   ├── index.html
│   │   ├── script.js
│   │   ├── style.css
│   │   │
│   │   ├── matching.html
│   │   ├── matching.css
│   │   ├── matching.js
│   │   │
│   │   ├── smart.html
│   │   ├── smart.css
│   │   └── smart.js
│
├── README.md
└── LICENSE
```
# Project Outcomes

- Open-source compatibility engine
- Configurable roommate matching system
- Conflict risk prediction
- Transparent compatibility scoring
- Digital roommate agreements
- Visual compatibility analytics
- Smart roommate recommendation system
- Modular and scalable architecture

---

# Future Improvements

- Machine learning based compatibility prediction
- Mobile application
- Real-time roommate chat
- Behavioral conflict prediction
- Integration with university housing systems

---

# Assumptions

- Users provide accurate preference information
- Lifestyle parameters are measurable
- Institutions may modify compatibility weights
- Initial deployment handles moderate user traffic

---

# References

- Elmasri & Navathe – Fundamentals of Database Systems
- Korth & Silberschatz – Database System Concepts
- MongoDB Documentation
- Node.js Documentation
- Express.js Guide
- React Documentation

---


