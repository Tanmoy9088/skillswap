"use client";

import { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useGlobalStore } from "@/store/globalState";
import { useCreateSwapRequest } from "@/hooks/skills/useCreateSwapRequest";
import type { MentorSkill } from "@/types/types/skills";

interface SwapRequestModalProps {
  mentorAuthUserId: string;
  skills: MentorSkill[];
}

interface SwapRequestForm {
  skillId: string;
  message: string;
}

export default function SwapRequestModal({
  mentorAuthUserId,
  skills,
}: SwapRequestModalProps) {
  const isOpen = useGlobalStore((state) => state.isSwapRequestOpen);
  const selectedSkillId = useGlobalStore((state) => state.selectedSwapSkillId);
  const closeSwapRequest = useGlobalStore((state) => state.closeSwapRequest);
  const setSelectedSwapSkillId = useGlobalStore(
    (state) => state.setSelectedSwapSkillId,
  );

  const createRequest = useCreateSwapRequest();

  const offeredSkills = useMemo(
    () => skills.filter((skill) => skill.skill_type === "offered"),
    [skills],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SwapRequestForm>({
    defaultValues: {
      skillId: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const selectedSkillIsAvailable =
      selectedSkillId !== null &&
      offeredSkills.some((skill) => skill.id === selectedSkillId);

    const initialSkillId = selectedSkillIsAvailable ? selectedSkillId : "";

    reset({
      skillId: initialSkillId,
      message: "",
    });
  }, [isOpen, selectedSkillId, offeredSkills, reset]);

  const handleClose = () => {
    reset({
      skillId: "",
      message: "",
    });

    setSelectedSwapSkillId("");
    closeSwapRequest();
  };

  const onSubmit = async (values: SwapRequestForm) => {
    const selectedSkill = offeredSkills.find(
      (skill) => skill.id === values.skillId,
    );

    if (!selectedSkill) {
      toast.error("Please select a valid skill.");
      return;
    }

    try {
      await createRequest.mutateAsync({
        mentorAuthUserId,
        skillId: selectedSkill.id,
        message: values.message,
      });

      reset({
        skillId: "",
        message: "",
      });

      setSelectedSwapSkillId("");
      closeSwapRequest();

      toast.success(
        `${selectedSkill.skill_name} swap request sent successfully!`,
      );
    } catch (error) {
      console.error("Failed to send swap request:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to send swap request.",
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#17366F]">Request a Swap</h2>

            <p className="mt-1 text-sm text-[#53617A]">
              Select the skill you want to learn from this mentor.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-6">
          <div>
            <label
              htmlFor="swap-skill"
              className="mb-2 block text-sm font-semibold text-[#17366F]"
            >
              Skill
            </label>

            <select
              id="swap-skill"
              {...register("skillId", {
                required: "Please select a skill.",
                onChange: (event) => {
                  setSelectedSwapSkillId(event.target.value || null);
                },
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select a skill</option>

              {offeredSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skill_name}
                </option>
              ))}
            </select>

            {errors.skillId && (
              <p className="mt-2 text-sm text-red-500">
                {errors.skillId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="swap-message"
              className="mb-2 block text-sm font-semibold text-[#17366F]"
            >
              Message
            </label>

            <textarea
              id="swap-message"
              rows={5}
              placeholder="Write a message to the mentor..."
              {...register("message", {
                maxLength: {
                  value: 500,
                  message: "Message cannot exceed 500 characters.",
                },
              })}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {errors.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={createRequest.isPending}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createRequest.isPending || offeredSkills.length === 0}
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createRequest.isPending ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
