"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Send, Loader2 } from "lucide-react";

import { useGlobalStore } from "@/store/globalState";
import { useCreateSwapRequest } from "@/hooks/skills/useCreateSwapRequest";

import type { MentorSkill } from "@/types/types/skills";

interface SwapRequestForm {
  skillId: string;
  message: string;
}

interface SwapRequestModalProps {
  mentorAuthUserId: string;
  skills: MentorSkill[];
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

  const offeredSkills = skills.filter(
    (skill) => skill.skill_type === "offered",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SwapRequestForm>({
    defaultValues: {
      skillId: selectedSkillId ?? "",
      message: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      skillId: selectedSkillId ?? offeredSkills[0]?.id ?? "",
      message: "",
    });
  }, [isOpen, selectedSkillId, offeredSkills, reset]);

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (values: SwapRequestForm) => {
    try {
      await createRequest.mutateAsync({
        mentorAuthUserId,
        skillId: values.skillId,
        message: values.message,
      });

      reset();

      closeSwapRequest();

      alert("Swap request sent successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error ? error.message : "Failed to send swap request.",
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeSwapRequest();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-[#17366F]">Request a Swap</h2>

            <p className="mt-1 text-sm text-gray-500">
              Send a learning request to this mentor.
            </p>
          </div>

          <button
            type="button"
            onClick={closeSwapRequest}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Skill */}
          <div>
            <label
              htmlFor="swap-skill"
              className="mb-2 block text-sm font-semibold text-[#17366F]"
            >
              Choose a skill
            </label>

            <select
              id="swap-skill"
              {...register("skillId", {
                required: "Please select a skill.",
                onChange: (event) => {
                  setSelectedSwapSkillId(event.target.value);
                },
              })}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select a skill</option>

              {offeredSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skill_name} — {skill.token_rate} tokens
                </option>
              ))}
            </select>

            {errors.skillId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.skillId.message}
              </p>
            )}
          </div>

          {/* Message */}
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
              placeholder="Tell the mentor what you'd like to learn..."
              {...register("message", {
                maxLength: {
                  value: 1000,
                  message: "Message cannot exceed 1000 characters.",
                },
              })}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {errors.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeSwapRequest}
              disabled={createRequest.isPending}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createRequest.isPending || offeredSkills.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createRequest.isPending ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Send Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
