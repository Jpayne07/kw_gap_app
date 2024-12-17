#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask, make_response, jsonify, request

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Project, ProjectCollaborators, Keywords


# Views go here!
class Signup(Resource):
    def post(self):
        try:
            print('test')
            print(request)
            data = request.get_json()
            new_user = User(
                username = data['username'],
                name = data['name'],
            )
            new_user.password_hash = data['password']
            print(new_user.to_dict())
            return (new_user.to_dict(), 200)
        except ValueError as e:
            response = make_response({"errors": ['validation errors']}, 400)
class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response
    
class Projects(Resource):
    def get(self):
        projects = [project.to_dict() for project in Project.query.all()]
        response = make_response(projects, 200)
        return response
    
class Keyword(Resource):
    def get(self):
        keyword = [keyword.to_dict() for keyword in Keywords.query.all()]
        response = make_response(keyword, 200)
        return response
    
    
class ProjectCollaborator(Resource):
    def get(self):
        collaborators = [{'id': collaborator.id,'username': collaborator.user.username,'project_id': collaborator.project_id, 'role': collaborator.role,  } for collaborator in ProjectCollaborators.query.all()]
        response = make_response(collaborators, 200)
        return response

api.add_resource(Users, '/user')
api.add_resource(Signup, '/signup')
api.add_resource(Projects, '/projects')
api.add_resource(Keyword, '/keywords')
api.add_resource(ProjectCollaborator, '/project_collaborators')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

