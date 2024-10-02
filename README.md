# Empowermap Frontend Deployment update

## TODOS

- [ ] Update Marker Icon
- [ ] Orga Icons
- [ ] Web Icons
- [ ] Intro Map Image

### Experiments

- [Experiments](https://github.com/DainPark-web/empowermap_vis_experiment)
- [Backend](https://github.com/vi-empowermap/backend)

### Repo

- Dev :

### Memo

<https://gsap.com/resources/React/>

#### Google MAP API

```bash

https://www.google.com/maps/search/?api=1&query=<lat>,<lng>

```


# Error Note
### Netlify: Troubleshooting SSL certificate errors
[solution1](https://answers.netlify.com/t/support-guide-troubleshooting-ssl-certificate-errors/39865?_gl=1*4un6xy*_gcl_au*MTkwNTEzNjkxNC4xNzI3MjUyNzUxLjE3MTM3NzE0NzcuMTcyNzI1Mjc4MC4xNzI3MjUyODM0)

- Step 1 - Check DNS
First, you’ll want to double-check your DNS settings.

If you’re using external DNS 994, your A Record for your bare domain should point to 75.2.60.5, while the CNAME record for your subdomain www should have the value [sitename].netlify.app within the configuration at either your registrar or other DNS provider.