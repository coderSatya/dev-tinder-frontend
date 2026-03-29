import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

// ── Types ─────────────────────────────────────────────────────────────────────
export type EditFormData = {
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  about?: string;
};

const schema = yup.object({
  firstName: yup.string().min(2, "Min 2 chars").required("Required"),
  lastName: yup.string().min(2, "Min 2 chars").required("Required"),
  age: yup.number().min(18).max(80).optional(),
  gender: yup.string().oneOf(["male", "female", "other"]).optional(),
  about: yup.string().max(200).optional(),
});

export const ALL_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "Vue",
  "Svelte",
  "MongoDB",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Prisma",
  "TailwindCSS",
  "PyTorch",
  "Flutter",
  "Kotlin",
  "Swift",
];

export const MAX_SKILLS = 5;

export function useProfileEdit() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Photo
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.photoUrl ?? null,
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Skills
  const [skills, setSkills] = useState<string[]>(user?.skills ?? []);
  const [skillInput, setSkillInput] = useState("");
  const [showSug, setShowSug] = useState(false);

  const filtered = ALL_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(s),
  );

  const addSkill = (s: string) => {
    const t = s.trim();
    if (!t || skills.includes(t) || skills.length >= MAX_SKILLS) return;
    setSkills((p) => [...p, t]);
    setSkillInput("");
    setShowSug(false);
  };

  const removeSkill = (s: string) => setSkills((p) => p.filter((x) => x !== s));

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      age: user?.age,
      gender: user?.gender ?? "",
      about: user?.about ?? "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: EditFormData) => {
    setIsSaving(true);
    try {
      const payload = { ...data, skills };

      // If photo was changed, convert to base64
      if (photoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(photoFile);
        await new Promise<void>((res) => {
          reader.onload = () => {
            (payload as any).photoUrl = reader.result as string;
            res();
          };
        });
      }

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/edit`,
        payload,
        { withCredentials: true },
      );

      setUser(res.data); // update Zustand store
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (err) {
      console.error(err);
      const axiosError = err as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  return {
    user,
    fileRef,
    photoPreview,
    skills,
    skillInput,
    showSug,
    filtered,
    isSaving,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handlePhotoChange,
    removePhoto,
    addSkill,
    removeSkill,
    setSkillInput,
    setShowSug,
  };
}
