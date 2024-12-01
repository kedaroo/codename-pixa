import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {image_url, path, user_id} = await request.json();

  const formData = new FormData();
  formData.append('image_url', image_url)
  formData.append('path', path)
  formData.append('user_id', user_id)

  const auth = 'Basic ' + btoa(process.env.USERNAME + ':' + process.env.PASSWORD);

  const response = await fetch(`${process.env.KESTRA_URL}/executions/company.team/process_embedding`, {
    method: "POST",
    body: formData,
    headers: {
      'Authorization': auth,
    },
  })

  const data = await response.json()
  return NextResponse.json(data)
}