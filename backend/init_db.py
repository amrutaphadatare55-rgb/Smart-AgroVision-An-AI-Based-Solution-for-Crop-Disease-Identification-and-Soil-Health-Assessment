"""Initialize database with test user"""
from main import Base, engine, SessionLocal, User
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key-change-in-production")

# Create tables
Base.metadata.create_all(bind=engine)
db = SessionLocal()

try:
    # Check if test user exists
    test_user = db.query(User).filter(User.email == "test@example.com").first()
    
    if not test_user:
        # Create test user
        test_user = User(
            name="Test User",
            email="test@example.com",
            password="password123",
            role="user"
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        print(f"✅ Created test user: test@example.com")
    else:
        print(f"✅ Test user already exists: test@example.com")
    
    # Generate token
    token = jwt.encode(
        {"user_id": test_user.id, "exp": datetime.utcnow() + timedelta(days=30)},
        JWT_SECRET,
        algorithm="HS256"
    )
    
    print(f"\n📋 Test User Credentials:")
    print(f"Email: test@example.com")
    print(f"Password: password123")
    print(f"\n🔑 Token (use this for API testing):")
    print(f"{token}")
    print(f"\nℹ️ Save this token to test API calls")
    
finally:
    db.close()
