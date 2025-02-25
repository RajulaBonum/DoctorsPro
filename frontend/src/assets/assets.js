import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.jpg'
import doc4 from './doc4.jpg'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.jpg'
import doc12 from './doc12.jpg'
import doc13 from './doc13.png'
import doc14 from './doc14.jpg'
import doc15 from './doc15.jpg'
import profile from './profile.png'
import arrow_drop from './arrow_drop.png'
import group from './group.jpg'
import arrow_forward from './arrow_forward.png'
import header_img from './header_img.png'
import docbanner1 from './docbanner1.png'
import docbanner2 from './docbanner2.png'

export const images = {
  doc1,
  doc2,
  doc3,
  doc4,
  doc5,
  doc6,
  doc7,
  doc8,
  doc9,
  doc10,
  doc11,
  doc12,
  doc13,
  doc14,
  doc15,
  profile,
  arrow_drop,
  group,
  arrow_forward,
  header_img,
  docbanner1,
  docbanner2,
}

export const specialitydata = [
  { speciality: "General Physician", icon: "🩺" },
  { speciality: "Cardiologist", icon: "🫀" },
  { speciality: "Dermatologist", icon: "🩹" },
  //{ speciality: "Pediatrician", icon: "👶" },
  //{ speciality: "Orthopedic Surgeon", icon: "🦴" },
  //{ speciality: "Neurologist", icon: "🧠" },
  //{ speciality: "Psychiatrist", icon: "💭" },
  //{ speciality: "Ophthalmologist", icon: "👁️" },
  { speciality: "ENT Specialist", icon: "👂" },
  //{ speciality: "Gynecologist", icon: "♀️" },
  //{ speciality: "Urologist", icon: "🚹" },
  { speciality: "Oncologist", icon: "🎗" },
  { speciality: "Gastroenterologist", icon: "🍎" },
  { speciality: "Endocrinologist", icon: "🧪" },
  { speciality: "Pulmonologist", icon: "🫁" }
]


export const doctors = [
    {
      "_id": "doc1",
      "name": "Dr. Emily Lanana",
      "image": doc1,
      "speciality": "General Physician",
      "degree": "MBBS",
      "experience": "3 years",
      "about": "Dr. Emily has a strong commitment to delivering comprehensive medical care for all her patients.",
      "fees": 60,
      "address": {
        "line1": "27th Cross, New York",
        "line2": "Circle, Ring Road, London"
      }
    },
    {
      "_id": "doc2",
      "name": "Dr. Michael Davis",
      "image": doc2,
      "speciality": "Cardiologist",
      "degree": "MD, DM (Cardiology)",
      "experience": "10 years",
      "about": "Dr. Davis specializes in heart diseases and cardiovascular health.",
      "fees": 120,
      "address": {
        "line1": "42nd Street, Los Angeles",
        "line2": "Sunset Boulevard, California"
      }
    },
    {
      "_id": "doc3",
      "name": "Dr. Sophia Patel",
      "image": doc3,
      "speciality": "Dermatologist",
      "degree": "MD (Dermatology)",
      "experience": "7 years",
      "about": "Dr. Patel is an expert in skincare, acne treatment, and cosmetic dermatology.",
      "fees": 80,
      "address": {
        "line1": "Green Park, London",
        "line2": "Oxford Street, UK"
      }
    },
    {
      "_id": "doc4",
      "name": "Dr. Richard Brown",
      "image": doc4,
      "speciality": "Pediatrician",
      "degree": "MD (Pediatrics)",
      "experience": "5 years",
      "about": "Dr. Brown provides expert care for children and infants.",
      "fees": 75,
      "address": {
        "line1": "Maple Avenue, Toronto",
        "line2": "King's Road, Canada"
      }
    },
    {
      "_id": "doc5",
      "name": "Dr. Olivia Adams",
      "image": doc5,
      "speciality": "Neurologist",
      "degree": "MD, DM (Neurology)",
      "experience": "12 years",
      "about": "Dr. Adams specializes in diagnosing and treating nervous system disorders.",
      "fees": 150,
      "address": {
        "line1": "5th Avenue, Manhattan",
        "line2": "Times Square, NYC"
      }
    },
    {
      "_id": "doc6",
      "name": "Dr. John Roberts",
      "image": doc6,
      "speciality": "Psychiatrist",
      "degree": "MD (Psychiatry)",
      "experience": "8 years",
      "about": "Dr. Roberts is a mental health specialist treating anxiety, depression, and more.",
      "fees": 100,
      "address": {
        "line1": "High Street, Melbourne",
        "line2": "Docklands, Australia"
      }
    },
    {
      "_id": "doc7",
      "name": "Dr. Sarah Johnson",
      "image": doc7,
      "speciality": "Orthopedic Surgeon",
      "degree": "MS (Orthopedics)",
      "experience": "9 years",
      "about": "Dr. Johnson specializes in bone and joint surgeries and rehabilitation.",
      "fees": 140,
      "address": {
        "line1": "Main Street, Chicago",
        "line2": "Lincoln Park, USA"
      }
    },
    {
      "_id": "doc8",
      "name": "Dr. Kevin White",
      "image": doc8,
      "speciality": "Gynecologist",
      "degree": "MD (Gynecology)",
      "experience": "11 years",
      "about": "Dr. White provides expert care in women's health and pregnancy.",
      "fees": 90,
      "address": {
        "line1": "Riverwalk, Miami",
        "line2": "Ocean Drive, Florida"
      }
    },
    {
      "_id": "doc9",
      "name": "Dr. Lily Carter",
      "image": doc9,
      "speciality": "Endocrinologist",
      "degree": "MD (Endocrinology)",
      "experience": "6 years",
      "about": "Dr. Carter specializes in diabetes and hormonal disorders.",
      "fees": 110,
      "address": {
        "line1": "Baker Street, London",
        "line2": "Hyde Park, UK"
      }
    },
    {
      "_id": "doc10",
      "name": "Dr. James Wilson",
      "image": doc10,
      "speciality": "Oncologist",
      "degree": "MD (Oncology)",
      "experience": "15 years",
      "about": "Dr. Wilson has extensive experience in cancer treatment and therapies.",
      "fees": 200,
      "address": {
        "line1": "Sunrise Street, Seattle",
        "line2": "Mount Rainier, Washington"
      }
    },
    {
      "_id": "doc11",
      "name": "Dr. Jessica Lee",
      "image": doc11,
      "speciality": "Pulmonologist",
      "degree": "MD (Pulmonology)",
      "experience": "10 years",
      "about": "Dr. Lee is an expert in treating respiratory and lung diseases.",
      "fees": 130,
      "address": {
        "line1": "Windy Road, Boston",
        "line2": "Harvard Street, USA"
      }
    },
    {
      "_id": "doc12",
      "name": "Dr. Aaron Green",
      "image": doc12,
      "speciality": "Nephrologist",
      "degree": "MD (Nephrology)",
      "experience": "14 years",
      "about": "Dr. Green specializes in kidney diseases and dialysis treatments.",
      "fees": 180,
      "address": {
        "line1": "Horizon Lane, Austin",
        "line2": "Tech Park, Texas"
      }
    },
    {
      "_id": "doc13",
      "name": "Dr. Natalie Brooks",
      "image": doc13,
      "speciality": "ENT Specialist",
      "degree": "MS (ENT)",
      "experience": "7 years",
      "about": "Dr. Brooks is a specialist in ear, nose, and throat disorders.",
      "fees": 95,
      "address": {
        "line1": "Cherry Avenue, San Francisco",
        "line2": "Golden Gate, California"
      }
    },
    {
      "_id": "doc14",
      "name": "Dr. Daniel Cooper",
      "image": doc14,
      "speciality": "Ophthalmologist",
      "degree": "MS (Ophthalmology)",
      "experience": "9 years",
      "about": "Dr. Cooper specializes in eye diseases, surgeries, and vision care.",
      "fees": 100,
      "address": {
        "line1": "Vision Plaza, Mumbai",
        "line2": "Marine Drive, India"
      }
    },
    {
      "_id": "doc15",
      "name": "Dr. Hannah Scott",
      "image": doc15,
      "speciality": "Urologist",
      "degree": "MS (Urology)",
      "experience": "13 years",
      "about": "Dr. Scott is an expert in urinary and male reproductive health.",
      "fees": 150,
      "address": {
        "line1": "Maple Gardens, Berlin",
        "line2": "Central Avenue, Germany"
      }
    }
]
  