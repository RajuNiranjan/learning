import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const employeeSchema = z.object({
  name: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  email: z.email().max(100),
  phone: z.string().optional(),
  website: z.url().optional(),
  role: z.enum(["Admin", "Editor", "Viewer"]).default("Admin"),
  isActive: z.boolean().default(true),
  skills: z.array(z.string()),
  availableSlots: z.array(z.string()),
  street: z.string().min(5).max(20),
  city: z.string().min(5).max(20),
  zipcode: z.string().min(5).max(10),
  company: z.string(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export const AddEmployeForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-10"
      >
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="username">User Name</label>
          <input type="text" {...register("username")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" {...register("phone")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="website">website</label>
          <input type="text" {...register("website")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="skills">skills</label>
          <input type="text" {...register("skills")} name="" id="" />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input type="text" {...register("role")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="street">street</label>
          <input type="text" {...register("street")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="city">city</label>
          <input type="text" {...register("city")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="zipcode">zipcode</label>
          <input type="text" {...register("zipcode")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="company">company</label>
          <input type="text" {...register("company")} name="" id="" />
        </div>{" "}
        <div>
          <label htmlFor="availableslot">availableslot</label>
          <input type="text" {...register("availableSlots")} name="" id="" />
        </div>
        <div>
          <label htmlFor="isActive">isActive</label>
          <input
            type="checkbox"
            {...register("isActive")}
            checked
            name=""
            id=""
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
