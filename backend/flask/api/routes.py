from flask import Blueprint
from api.actions import get_categories, get_users, get_ads, add_ad

routes_bp = Blueprint('routes_bp', __name__)

routes_bp.route('/categories', methods=['GET'])(get_categories)
routes_bp.route('/users', methods=['GET'])(get_users)
routes_bp.route('/ads', methods=['GET'])(get_ads)
routes_bp.route('/ads', methods=['POST'])(add_ad)
