import TodoItem from "../models/TodoItem";

const changeItemStatus = async (data: any, status: string) => {
  const result: any = await TodoItem.update(
    {
      status
    },
    {
      where: { id: data.id, userId: data.userId },
    }
  );

  return result;
}

export default changeItemStatus;