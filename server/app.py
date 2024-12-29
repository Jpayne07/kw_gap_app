#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,  session
from flask_restful import Resource
from flask import Flask, make_response, jsonify, request
from sqlalchemy import desc
from werkzeug.exceptions import UnprocessableEntity, Unauthorized
from werkzeug.utils import secure_filename
import os
import csv

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Project, ProjectCollaborators, Keywords

ALLOWED_EXTENSIONS = {'csv'}
app.config['UPLOAD_FOLDER'] = 'uploads'

# Views go here!
class Home(Resource):
    def get(self):
        return 'Hello, please navigate to a route to see more info', 200
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            if not data.get('username'):
                raise UnprocessableEntity(description="Username is required")
            if not data.get('password'):
                raise UnprocessableEntity(description="Username is required")
            new_user = User(
                username = data['username'],
                name = data['name'],
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
            return (new_user.to_dict(), 200)
        except ValueError as e:
            response = make_response({"errors": ['validation errors']}, 400)
            return response
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response
class UserItem(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        response = make_response(user.to_dict(), 200)
        return response
class Projects(Resource):
    def get(self):
        projects = [project.to_dict() for project in Project.query.all()]
        project_list = []
        for project in projects:
            if session['user_id']:
                if any(collaborator['user_id'] == session['user_id'] for collaborator in project['collaborators']):
                    project_list.append(project)
        response = make_response(project_list, 200)
        return response
    
    def post(self):
        data = request.get_json()
        new_project = Project(
            logo = data['logo'],
            brand_name = data['brand_name']
        )
        owner_collaborator = ProjectCollaborators(
            user_id=session.get('user_id'),
            role='owner'
            )   

    # Append the collaborator to the project's collaborators list
        new_project.collaborators.append(owner_collaborator)
        db.session.add(new_project)
        db.session.commit()

        project_in_db = Project.query.order_by(desc(Project.id)).first()
        
        response = make_response(project_in_db.to_dict(), 201)
        return response
class ProjectItem(Resource):
    def get(self, id):
        project = Project.query.filter_by(id=id).first()
        response = make_response(project.to_dict(), 200)
        return response
    
    def patch(self, id):
        data = request.get_json()
        project = Project.query.filter_by(id=id).first()
        for attr in data:
            setattr(project, attr, data[attr])
        #to do - add patch for adding collaborators
        response = make_response(project.to_dict(), 200)
        return response
    
    def delete(self, id):
        project = Project.query.filter_by(id=id).first()
        db.session.delete(project)
        db.session.commit()
        response = make_response([], 204)
        return response
class Keyword(Resource):
    def get(self):
        keyword = [keyword.to_dict() for keyword in Keywords.query.all()]
        response = make_response(keyword, 200)
        return response
class FileUpload(Resource):
    def post(self):
        if 'file' not in request.files:
            return {"error": "No file part"}, 400

        file = request.files['file']

        if file.filename == '':
            return {"error": "No selected file"}, 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            with open(file_path, mode='r', newline='', encoding='utf-8') as csvfile:
                csv_reader = csv.reader(csvfile)
                next(csv_reader)  # Skip the header row if present
                for row in csv_reader:
                    keyword = row[0]
                    search_volume = row[1]
                    project_id = row[2]
                    keyword_model = Keywords(keyword = keyword, volume = search_volume, project_id = project_id)
                db.session.add(keyword_model)
                db.session.commit()
            
            return keyword_model.to_dict(), 200

        return {"error": "Invalid file type"}, 400

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class ProjectCollaborator(Resource):
    def get(self):
        collaborators = [collaborator.to_dict() for collaborator in ProjectCollaborators.query.all()]
        response = make_response(collaborators, 200)
        return response
    
    def post(self):
        collaborator = request.get_json()
        print(collaborator)
        new_collaborator_object = ProjectCollaborators(
            project_id = collaborator['project_id'],
            role = collaborator['role'],
            user_id = collaborator['user_id']
        )
        db.session.add(new_collaborator_object)
        db.session.commit()
        response = make_response(new_collaborator_object.to_dict(), 201)
        print(response)
        return (response)
        
    
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id') 

        if user_id:
            id = session['user_id']
            user = User.query.filter_by(id=id).first().to_dict()
            user_no_pass = {
                'id': session['user_id'],
                'username': user['username'],
                'name': user['name']
            }
            response = make_response(user_no_pass, 200)
            return response
        else:
            response = make_response("Not authorized", 401)
            return response
        
class Login(Resource):
    def post(self):
        user_object = request.get_json()
        user = User.query.filter(User.username == user_object['username']).first()
        if user:
            if user.authenticate(user_object['password']):
                session['user_id'] = user.to_dict()['id']
                return user.to_dict(), 200
        else:
            raise Unauthorized("Username or password are incorrect")
        
class Logout(Resource):
    def delete(self):
        if session["user_id"]:
            session["user_id"] = None
            return {}, 204
        else:
            raise Unauthorized("You are not logged in")

api.add_resource(Home, '/')
api.add_resource(Logout, '/logout')
api.add_resource(Users, '/user')
api.add_resource(UserItem, '/user/<int:id>')
api.add_resource(Signup, '/signup')
api.add_resource(Projects, '/projects')
api.add_resource(ProjectItem, '/projects/<int:id>')
api.add_resource(Keyword, '/keywords')
api.add_resource(FileUpload, '/keyword_upload')
api.add_resource(ProjectCollaborator, '/project_collaborators')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

