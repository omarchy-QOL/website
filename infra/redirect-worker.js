const canonicalHost = "omarchyqol.com"

export default {
  fetch(request) {
    const destination = new URL(request.url)
    destination.protocol = "https:"
    destination.hostname = canonicalHost
    destination.port = ""

    return Response.redirect(destination.toString(), 308)
  },
}
