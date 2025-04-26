# buckettest.py
import boto3

# Create a new test script that doesn't rely on Django settings
bucket_name = 'nature-picture-images'  # Replace with your actual bucket name

# This will use your AWS credentials from ~/.aws/credentials automatically
s3 = boto3.client('s3')

try:
    response = s3.list_objects(Bucket=bucket_name)
    print("S3 connection successful!")
    objects = response.get('Contents', [])
    print(f"Found {len(objects)} objects in the bucket")
    
    # Print the first few objects if any exist
    if objects:
        print("First few objects:")
        for obj in objects[:5]:
            print(f" - {obj['Key']}")
except Exception as e:
    print(f"S3 connection error: {e}")