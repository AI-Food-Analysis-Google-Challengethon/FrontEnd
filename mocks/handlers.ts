import { HttpResponse, http } from 'msw';

export const handlers = [
    http.post('http://localhost:8080/api/diet', async ({ request }) => {
        const accessToken = request.headers.get('accessToken')
       
        if (!accessToken) {
          return new HttpResponse(null, { status: 401 })
        }
       
        return HttpResponse.json(
          {
            status: 200,
            msg: "ANALYSIS_CREATED",
            data: {
              total_kcal: 2400,
              carbs: 100,
              protein: 200,
              fat: 100,
              vitamin: {
                C: 0.1,
                A: 0.2,
                B: 0.3
              },
              kalium: 70.7,
              natrium: 12.6,
              cholesterol: 15
            }
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
       }),
 
    http.get('http://localhost:8080/api/diet', () => {
        return HttpResponse.json({
          status: 200,
          msg: "ANALYSIS_CREATED",
          data: {
            total_kcal: 2400,
            carbs: 100,
            protein: 200,
            fat: 100,
            vitamin: {
              C: 0.1,
              A: 0.2,
              B: 0.3
            },
            kalium: 70.7,
            natrium: 12.6,
            cholesterol: 15
          }
        });
    }),
 ];