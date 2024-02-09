toProd:
	echo "Merging testing into main branch...."
	git merge --no-ff --no-commit origin/Testing
	echo "Reverting .env changes..."
	git reset HEAD .env
	git checkout -- .env
	echo "Building...."
	yarn install 
	yarn build
	echo "Commiting changes"
	git add -A
	git commit -m "merged Testing to Production"
	git push

pullBuild:
	git -C ./build pull