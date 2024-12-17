#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import User, Project, ProjectCollaborators, Keywords
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        from app import db


        # Drop all tables and recreate them
        db.drop_all()
        db.create_all()

        # Seed Users
        user1 = User(username="john_doe", name="John Doe")
        user2 = User(username="jane_smiths", name="Jane Smith")
        user3 = User(username="alice_wonder", name="Alice Wonderland")

        db.session.add_all([user1, user2, user3])
        db.session.commit()

        # Seed Projects
        project1 = Project(logo="logo1.png", brand_name="Awesome Brand")
        project2 = Project(logo="logo2.png", brand_name="Cool Startup")
        project3 = Project(logo="logo3.png", brand_name="Tech Innovators")

        db.session.add_all([project1, project2, project3])
        db.session.commit()

        # Seed Project Collaborators (Many-to-Many)
        collab1 = ProjectCollaborators(user_id=user1.id, project_id=project1.id, role="Owner")
        collab2 = ProjectCollaborators(user_id=user2.id, project_id=project1.id, role="Editor")
        collab3 = ProjectCollaborators(user_id=user2.id, project_id=project2.id, role="Owner")
        collab4 = ProjectCollaborators(user_id=user3.id, project_id=project3.id, role="Viewer")

        db.session.add_all([collab1, collab2, collab3, collab4])
        db.session.commit()

        # Seed Keywords (One-to-Many)
        keyword1 = Keywords(keyword="AI", volume=1500, project_id=project1.id)
        keyword2 = Keywords(keyword="Machine Learning", volume=2000, project_id=project1.id)
        keyword3 = Keywords(keyword="Cloud Computing", volume=1800, project_id=project2.id)
        keyword4 = Keywords(keyword="Big Data", volume=1200, project_id=project3.id)
        keyword5 = Keywords(keyword="IoT", volume=900, project_id=project3.id)

        db.session.add_all([keyword1, keyword2, keyword3, keyword4, keyword5])
        db.session.commit()

        print("Database seeded successfully!")

