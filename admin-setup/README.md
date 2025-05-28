# Creating a cluster admin

(From <https://medium.com/@kanrangsan/creating-admin-user-to-access-kubernetes-dashboard-723d6c9764e4>)

1. `kubectl -n kube-system apply -f dashboard-admin-user.yml`
2. `kubectl -n kube-system apply -f admin-role-binding.yml`
3. `kubectl create token admin-user -n kube-system` (from <https://mvallim.github.io/kubernetes-under-the-hood/documentation/kube-dashboard.html>)
4. Copy massive token and put it into dashboard





