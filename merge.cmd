call git add .
call git commit -am %3
call git push
call git checkout %2
call git pull
call git merge %1
call git push
call git checkout %1
