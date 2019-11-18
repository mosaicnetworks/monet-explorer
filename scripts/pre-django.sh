python3 pip3 -m install -r ./server/requirements.txt

python3 ./server/src/manage.py makemigrations
python3 ./server/src/manage.py makemigrations core
python3 ./server/src/manage.py makemigrations downloads
python3 ./server/src/manage.py migrate
