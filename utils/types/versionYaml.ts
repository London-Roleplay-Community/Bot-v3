export interface Version {
  information: {
    app_name: string,
    version: string
  },
  git: {
    hash: string,
    title: string
  }
}