import logo from './logo.svg';
import './App.css';


function App() {

  const getToken = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
      myHeaders.append('Cookie', '__cf_bm=GMHDiUtTatiuiC1CXX.28tdsv3OeMMonu3iKj9ZmFK8-1704317969-1-ASvMCfPQ97jY6Rj+FLd72sxRp8HOgXzu88b/MnxyMhN/VOYZlfTylTB9J+qzNCMJCPv28mR4ikOrTdwfaYzmLzU=')

      const urlencoded = new URLSearchParams()
      urlencoded.append('grant_type', 'client_credentials')
      urlencoded.append('client_id', 'dde9aed6-97b2-4cb7-b61c-3602cfa9fd18')
      urlencoded.append('client_secret', 't#qdBDY$7A*(HKH%')
      urlencoded.append('scope', 'OR.Jobs OR.Jobs.Read OR.Jobs.Write')

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      }

      const response = await fetch('https://cloud.uipath.com/identity_/connect/token', requestOptions)
      const result = await response.text()
      const resultJSON = JSON.parse(result)
      return resultJSON
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const runSchedule = async () => {
    try {
      // Obtiene el token utilizando la función getToken
      const obtainedToken = await getToken()

      console.log({ obtainedToken })
      const token = obtainedToken?.access_token
      const toke = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg2RTAyOEZCRDk1MzlFNTY3MjU2MjY1OTZGRkQyQjk0OUU3MjEwMkIiLCJ4NXQiOiJodUFvLTlsVG5sWnlWaVpaYl8wcmxKNXlFQ3MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2Nsb3VkLnVpcGF0aC5jb20vaWRlbnRpdHlfIiwibmJmIjoxNzA0MzE3NjY5LCJpYXQiOjE3MDQzMTc5NjksImV4cCI6MTcwNDMyMTU2OSwiYXVkIjoiVWlQYXRoLk9yY2hlc3RyYXRvciIsInNjb3BlIjpbIk9SLkpvYnMiLCJPUi5Kb2JzLlJlYWQiLCJPUi5Kb2JzLldyaXRlIl0sInN1Yl90eXBlIjoic2VydmljZS5leHRlcm5hbCIsInBydF9pZCI6IjAwNDg1YWQwLWY3M2EtNGJiZS1iZmRkLTJkZDg2NzE3ZjRlMiIsImNsaWVudF9pZCI6ImRkZTlhZWQ2LTk3YjItNGNiNy1iNjFjLTM2MDJjZmE5ZmQxOCIsImp0aSI6IjYzODJFQThBMTBGMENGNDAzNjI1NEQzMEFBQzdCQ0JGIn0.KXfyKw_sOOgHcW2pqfGI1sPkTdCoEh_B47GNy0KTMrS0KxMrgtS96poGBSWoMDYSG_gigVjxVxxBzgdWw98N9y7jHYUS36P46H69Rh5S_Qz-E1d4VUlEGZ3JwO90mPV6aajXOf4jZnuQXbewiuuQG7p7T8nI1ZYNHlB7OG49rgq20bSjfxqfhlvNaVZRm31eZUTwXeEvTtjUHr_pCpNlAvhZ6_A3Dzs5GjqN4XIftwKb49j4fbeJVyO0py7_lvYECM45NR3Og42ojFE58gEcAoWyl-fPCERSnrYiB6QXdidsqDpbpjSnriWBuvfrchDTASsD9iMr0YrrZmqt_Ng5eg'

      console.log(token)
      // Configuración de los encabezados de la solicitud
      const myHeaders = new Headers()
      myHeaders.append('Authorization', `Bearer ${token}`)
      myHeaders.append('X-UIPATH-TenantName', 'DefaultTenant')
      myHeaders.append('X-UIPATH-OrganizationUnitId', '3785083')
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Cookie', '__cf_bm=GMHDiUtTatiuiC1CXX.28tdsv3OeMMonu3iKj9ZmFK8-1704317969-1-ASvMCfPQ97jY6Rj+FLd72sxRp8HOgXzu88b/MnxyMhN/VOYZlfTylTB9J+qzNCMJCPv28mR4ikOrTdwfaYzmLzU=')

      // Cuerpo de la solicitud
      const raw = JSON.stringify({
        startInfo: {
          ReleaseKey: '2b717bf0-65bb-451d-a267-7ea101572091',
          RobotIds: [],
          JobsCount: 1,
          JobPriority: 'Normal',
          Strategy: 'ModernJobsCount',
          RuntimeType: 'Unattended',
          InputArguments: ''
        }
      })

      // Configuración de las opciones de la solicitud
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // mode: 'no-cors', // Agrega esta línea para activar el modo "no-cors"
        redirect: 'follow'
      }

      // Realiza la solicitud a la API utilizando fetch
      const apiUrl = 'https://cloud.uipath.com/demo_rch/DefaultTenant/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs'
      const apiResponse = await fetch(apiUrl, requestOptions)

      // Procesa la respuesta de la API
      const responseDataSchedule = await apiResponse.text()
      console.log(responseDataSchedule)

      const resultJSON = JSON.parse(responseDataSchedule)
      return resultJSON
    } catch (error) {
      console.error('Error al realizar la solicitud:', error)
    }
  }

  return (
    <div className="App">
    

    <div>
      boton de orquestador 

      <button variant="text" color="default" onClick ={()=>runSchedule()}>
        orquestador
      </button>
    </div>


    </div>
  );
}

export default App;
