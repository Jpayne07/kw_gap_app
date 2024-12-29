from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import ForeignKey
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import UniqueConstraint


from config import db, bcrypt

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    _password_hash = db.Column(db.String) 
    name = db.Column(db.String, nullable = False)
    #begin relationships
    collaborations = db.relationship('ProjectCollaborators', back_populates = 'user')

    projects = association_proxy('collaborations', 'projects',
            creator=lambda project_obj: ProjectCollaborators(projects = project_obj))
    
    keywords = association_proxy('projects', 'keywords',
            creator=lambda kw_obj: Project(keyword = kw_obj))
    
    __table_args__ = (
        UniqueConstraint('username', name='uq_user_username'),
    )
    @hybrid_property
    def password_hash(self):
        raise AttributeError("password_hash is not accessible.")

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __getattr__(self, name):
        if name == 'password_hash':
            raise AttributeError(f"{name} is not accessible.")
        return super().__getattr__(name)

    
    #begin serializing
    serialize_rules = ('-projects', '-_password_hash')

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key = True)
    logo = db.Column(db.String)
    brand_name = db.Column(db.String, nullable = False)

    collaborators = db.relationship('ProjectCollaborators', back_populates = 'projects')
    keywords = db.relationship('Keywords', back_populates = 'project')
    serialize_rules = ('-collaborations',)

class ProjectCollaborators(db.Model, SerializerMixin):
    __tablename__ = 'project_collaborators'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    project_id = db.Column(db.Integer, ForeignKey('projects.id'))
    role = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates = 'collaborations')
    projects = db.relationship('Project', back_populates = 'collaborators')
    serialize_rules = ('-projects', '-user.collaborations', 'user')

class Keywords (db.Model, SerializerMixin):
    __tablename__ = 'keywords'
    id = db.Column(db.Integer, primary_key = True)
    keyword = db.Column(db.String)
    volume = db.Column(db.Integer)
    project_id = db.Column(db.Integer, ForeignKey('projects.id'), nullable=False)

    # Define relationship back to the project
    project = db.relationship('Project', back_populates='keywords')
    serialize_rules =( '-project',)