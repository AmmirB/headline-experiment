import json

# Path to your NDJSON file
ndjson_file_path = 'headlines.json'
# Path for the new JSON file
json_file_path = 'wellFormed.json'

# Read the NDJSON content
with open(ndjson_file_path, 'r') as file:
    ndjson_content = file.readlines()

# Parse each line as JSON and collect into a list
json_content = [json.loads(line) for line in ndjson_content]

# Write the list to a new JSON file
with open(json_file_path, 'w') as file:
    json.dump(json_content, file, indent=4)

