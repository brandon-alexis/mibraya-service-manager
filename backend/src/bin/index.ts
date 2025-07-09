import { app } from '../app'
import { port } from '../config/load-environment'

const run = () => {
  console.log(`Server running on port ${port}`)
}

app.listen(port, run)
