# Contributing guidelines

## Working with prereleases

### Going from `alpha => beta`

```sh
git checkout alpha
git pull --rebase
git fetch origin main
git rebase origin/main
git push origin alpha # optional

git checkout beta
git reset --hard alpha
git push origin main
```

### Going from `beta => main`

```sh
git checkout beta
git pull --rebase
git fetch origin main
git rebase origin/main
git push origin beta # optional

git checkout -b v2 # make a new release branch
git reset --hard beta
git push origin v2
# make a PR to `main`
```
