import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const previousTitles = [
  "Why I Built Segmentary After Using MMSegmentation",
  "Why I Replaced My MMSegmentation Workflow",
  "From MMSegmentation to Segmentary",
];
const title = "Building Segmentary for the Hugging Face Ecosystem";
const description =
  "The vision behind Segmentary: one reproducible suite for training, evaluating, comparing, exporting, and understanding Hugging Face segmentation models.";
const date = new Date("2026-08-19T12:00:00.000Z");
const tags = [
  "hugging-face",
  "computer-vision",
  "semantic-segmentation",
  "pytorch",
  "open-source",
];

const content = `
Hugging Face makes it remarkably easy to discover a model. I want Segmentary to make the rest of that model's life just as easy.

Finding a segmentation checkpoint should lead naturally into verifying a dataset, fine-tuning the model, evaluating it under a defensible protocol, comparing it with alternatives, measuring its speed and memory, exporting it, and inspecting where it fails. Today those steps are often split across model-specific examples, training scripts, notebooks, deployment tools, and private experiment conventions.

I am building [Segmentary](https://github.com/arianizadi/segmentary) to turn that fragmented path into one segmentation suite.

The current release is a config-driven PyTorch framework for semantic segmentation. It already trains native, Hugging Face, and Segmentation Models PyTorch architectures through one experiment contract. The larger direction is to make it the place where Hugging Face segmentation models can be taken from pretrained checkpoint to trustworthy result and deployable artifact without rebuilding the surrounding infrastructure for every architecture.

## The Missing Layer Around A Model

A model definition is only one part of a segmentation project.

Real work begins when the model meets a dataset. Masks have integer IDs with domain-specific meaning. Some classes are absent from some datasets. Images have different native resolutions. Large images may require sliding-window evaluation. A transfer stage may need to reuse most learned tensors while replacing an incompatible classifier. A production decision needs latency and memory, not only validation accuracy.

The usual workflow accumulates glue:

- one script to convert the data;
- another to fine-tune a specific checkpoint;
- a notebook for metrics;
- custom code for sliding-window inference;
- a spreadsheet for model comparisons;
- a separate export experiment;
- screenshots for qualitative review;
- and a collection of undocumented assumptions connecting all of it.

Segmentary is meant to be that missing layer. The model remains important, but the framework owns the complete, reproducible path around it.

## A Small Starting Experience

I want the first successful experiment to feel obvious even when the underlying system is strict.

~~~bash
segmentary-init my-project
cd my-project

segmentary-train base.yaml model.yaml experiment.yaml --print-config
segmentary-verify --dataset my_data --loader folder --root data \\
  --mapping my_data --space example --taxonomy taxonomy
segmentary-overfit base.yaml model.yaml experiment.yaml --images 8
segmentary-train base.yaml model.yaml experiment.yaml --seed 0
~~~

The generated project uses ordinary folders of images and single-channel integer masks. Configuration is split into small YAML files that merge from left to right. Unknown keys and incompatible values fail before GPU work begins. The fully resolved config is stored with the result.

The verification and overfit commands are part of the main workflow, not optional debugging trivia. They answer two questions early: does the dataset mean what I think it means, and can this model learn these examples at all?

That makes Segmentary approachable without making it permissive in dangerous ways.

## Hugging Face Models As First-Class Citizens

Segmentary already supports Hugging Face semantic segmentation models through the standard auto-model interface. The current catalog exercises architectures including SegFormer, BEiT with UPerNet, MobileViT with DeepLabV3, and other dense predictors.

Supporting a model means more than making its forward pass run once.

Segmentary normalizes model outputs into a shared segmentation contract, validates class counts and spatial behavior, verifies gradients, tracks which classifier parameters should update, and records exactly which pretrained revision entered the experiment. The same model can then use the framework's dataset mapping, curricula, metrics, evaluation, checkpoint, comparison, and resource-reporting paths.

This is the experience I want to expand across the Hugging Face segmentation ecosystem:

~~~yaml
model:
  arch: hf_auto
  pretrained: openmmlab/upernet-swin-tiny
  output_channels: 21
~~~

The YAML should be the beginning, not the point where every model needs a new private training stack.

## One Contract For Data And Taxonomy

Segmentation datasets carry meaning in every pixel. Class ID 3 in one dataset may have nothing to do with class ID 3 in another. Some sources label concepts that the target merges. Others omit classes entirely. Padding must stay ignored instead of becoming a valid background label.

Segmentary makes that meaning explicit.

A taxonomy defines a canonical class space. Dataset mappings define how native IDs enter it. Per-sample active-class masks prevent a sample from being penalized for a class its source never labels. Binary tasks use an explicit positive class and threshold instead of pretending a one-logit output is ordinary multiclass segmentation.

This becomes especially important when a pretrained Hugging Face model, a public dataset, and a user's private classes meet. Segmentary should make the conversion visible and reject contradictions rather than silently producing a plausible metric for the wrong labels.

## Training Curricula Instead Of One-Off Scripts

Segmentation work often needs stages: pretraining, domain adaptation, target fine-tuning, frozen-backbone experiments, or LoRA.

Segmentary treats those stages as a curriculum:

~~~yaml
stages:
  - name: source
    init_from: pretrained
    iters: 40000

  - name: target
    init_from: previous
    iters: 20000
    lr_scale: 0.1
~~~

The framework validates the checkpoint handoff, resets only declared incompatible task components, preserves compatible learned tensors, and records the resolved optimizer behavior. It supports full tuning, frozen backbones, and LoRA while keeping the final result attached to the complete stage history.

Long jobs can resume from their newest compatible periodic checkpoint. A completed source stage can be reused when a target stage needs another attempt. That saves time and electricity without weakening provenance.

## Results That Can Be Defended

Every completed run writes a structured record containing its config hash, Git revision and dirty state, environment, dataset and taxonomy identity, checkpoint, evaluation settings, metrics, wall time, and peak memory.

That record answers questions that a single mIoU cannot:

- Which exact weights were evaluated?
- Was the raw model or its exponential moving average used?
- Was the image resized, evaluated natively, or passed through sliding windows?
- Which classes were actually supervised?
- Did two rows in a comparison use the same protocol?
- How much time and GPU memory did the run require?

The comparison tools reject incompatible records. Missing evidence remains missing instead of being turned into zero. A reused result keeps its original provenance instead of being presented as a newly trained model.

For a Hugging Face user, this means a model card or experiment report can eventually be backed by the exact machine record that produced its claims.

## Evaluation, Performance, And Visual Analysis

The suite does not stop when the loss loop finishes.

Segmentary includes native-resolution and sliding-window evaluation, per-class metrics, confusion matrices, boundary metrics, and explicit raw-versus-EMA selection. Its campaign tools benchmark model-only FPS, latency, parameter memory, checkpoint size, peak inference VRAM, training time, and GPU-hours under declared protocols.

It can also export portable scene bundles containing the source image, ground-truth mask, predictions, taxonomy, and provenance. Those bundles open in the separate Inference Checker for overlays, side-by-side comparisons, class metrics, pixel inspection, and model diffs.

That connects three levels of evidence:

1. Did the training run complete correctly?
2. Is the aggregate result strong enough for the task?
3. What does the model actually get right and wrong in the same scene?

## Proven Across A Real Model Catalog

The completed Cityscapes and RailSem19 campaign covers 37 shipped recipes representing 36 unique physical models. It spans convolutional, transformer, query-based, native, Hugging Face, and SMP implementations under shared quality and performance protocols.

The campaign is proof of the framework, not the framework's purpose. Running many different architectures exposed problems that a favorite-model demo would have missed: checkpoint compatibility, BatchNorm evaluation, EMA transfer, query-mask memory, taxonomy changes, output normalization, interruption recovery, and evidence publishing.

The important outcome is that different model families passed through the same inspectable lifecycle and produced comparable artifacts.

## The Full-Suite Direction

Segmentary is already useful for semantic segmentation, but the complete vision is larger. I want a Hugging Face user to move through the entire segmentation workflow without leaving one coherent tool.

The roadmap includes:

- broader admission of Hugging Face segmentation checkpoints and architectures;
- Hub-aware discovery, revision pinning, and compatibility reporting;
- repeatable fine-tuning recipes generated from model and dataset metadata;
- first-class publishing of trained weights, model cards, configs, and evaluation evidence back to the Hub;
- broader export coverage and deployment validation;
- stronger experiment and scene-analysis tooling;
- complete multilabel workflows;
- and expansion from semantic and binary segmentation toward instance, panoptic, video, depth-aware, and multimodal segmentation where the contracts are mature enough to remain honest.

Those are roadmap items, not claims that every segmentation task is finished today. The standard is not a long feature list. Each addition must preserve the same rules around configuration, data meaning, checkpoint safety, comparable evaluation, and provenance.

## Why Use Segmentary Today?

Segmentary is a good fit if you want:

- a straightforward folder-to-training path;
- Hugging Face, native, and SMP models under one experiment format;
- explicit taxonomy and multi-dataset behavior;
- sequential transfer learning and safe resumption;
- strict validation before expensive GPU work;
- detailed metrics with reproducible provenance;
- performance and memory evidence alongside accuracy;
- and a framework whose public docs state both capabilities and limitations.

It is intentionally focused. It does not yet cover every segmentation task or every checkpoint on the Hub. What it offers today is a strong semantic segmentation foundation and an architecture designed to grow into the broader suite without turning every new model into another disconnected script.

## Build With It

Segmentary is open source under the MIT license at [github.com/arianizadi/segmentary](https://github.com/arianizadi/segmentary).

Start with the generated example, point it at your own image and mask folders, or select a supported Hugging Face model from the catalog. The repository includes tutorials, model and component references, worked dataset and transfer configurations, evaluation guidance, export documentation, and complete comparison evidence.

My goal is to make segmentation models easier to use and their results harder to misunderstand. Hugging Face has made models discoverable. I want Segmentary to make the entire segmentation workflow around those models dependable.
`;

async function main() {
  const existing = await prisma.blogPost.findFirst({
    where: { title: { in: [title, ...previousTitles] } },
  });
  const data = { title, description, date, tags, content };

  const post = existing
    ? await prisma.blogPost.update({ where: { id: existing.id }, data })
    : await prisma.blogPost.create({ data });

  console.log(`${existing ? "Updated" : "Created"} post ${post.id}: ${post.title}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
