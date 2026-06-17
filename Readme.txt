Start the server
From your project folder:
cd /Users/adamkendall/Projects/learning-git
python3 -m http.server 8765

Ctrl+C 

OR

lsof -ti :8765 | xargs kill

