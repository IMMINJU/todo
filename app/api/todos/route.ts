// app/api/todos/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const { data, error } = await supabase
    .from("todos")
    .insert({ title })
    .single();
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const { data, error } = await supabase
    .from("todos")
    .update({ completed })
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  return NextResponse.json({ status: "ok" });
}
