# Healthcare Website

## Overview

This project is a healthcare website developed using Spring Boot and Thymeleaf, designed to connect users with doctors based on their location and problem specialization. The website enables users to book appointments, view doctor details, and ask questions related to their health. The backend is powered by AWS RDS, and the application is deployed on AWS Elastic Beanstalk for easy management and scalability.

## Features

- **Doctor Appointment Booking**: Users can book appointments with doctors based on location and specialization.
- **Dynamic Fee Calculation**: The website dynamically calculates and displays the doctor fee before the user confirms the booking.
- **Location-Based Search**: The search function uses location details taken from the user's browser to filter doctors.
- **Instant Q&A**: Integrated with the ChatGPT API, allowing users to ask health-related questions and receive instant responses.
- **Scalable Deployment**: The application is deployed on AWS Elastic Beanstalk, ensuring easy management and scalability.

## Prerequisites

To build and run the Healthcare Website, you need the following:

- Java Development Kit (JDK) 11 or higher
- Maven
- AWS RDS instance (for the database)
- AWS Elastic Beanstalk (for deployment)
- OpenAI API key (for ChatGPT integration)

## Usage

- **Book an Appointment**: Navigate to the services page, filter doctors by location and specialization, and book an appointment. The application dynamically calculates and displays the final fee before you confirm the booking.
- **View Doctor Details**: Click on a doctor to view their profile, including availability, specialization, and fees.
- **Ask a Question**: Use the integrated chat feature to ask health-related questions and receive instant responses via the ChatGPT API.

## Future Enhancements

- **Advanced Search Filters**: Implement additional filters based on doctor ratings and availability to improve user search experience.
- **Multi-Language Support**: Provide support for multiple languages to cater to a broader audience.
- **Mobile App Integration**: Develop a mobile app version of the website for easier access and enhanced user experience.
### Note: Since I used the basic OpenAI API Key, the number of usages per key is done. So, the ChatGPT Integeration may not work properly.
