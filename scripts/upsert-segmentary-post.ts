import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const previousTitles = [
  "Why I Built Segmentary After Using MMSegmentation",
  "Why I Replaced My MMSegmentation Workflow",
  "From MMSegmentation to Segmentary",
  "Building Segmentary for the Hugging Face Ecosystem",
  "Segmentary: A Segmentation Suite for Hugging Face Models",
];
const title = "Segmentary: A Hugging Face Segmentation Suite";
const description =
  "A practical introduction to Segmentary, a reproducible suite for training, evaluating, comparing, and exporting Hugging Face segmentation models.";
const date = new Date("2026-08-19T12:00:00.000Z");
const tags = [
  "hugging-face",
  "computer-vision",
  "semantic-segmentation",
  "pytorch",
  "open-source",
];

const content = `
Hugging Face makes segmentation models easy to discover. Using those models in a complete project still requires more work: validating a dataset, fine-tuning safely, choosing an evaluation protocol, comparing alternatives, measuring performance, and exporting the final model.

I built [Segmentary](https://github.com/arianizadi/segmentary) to provide that complete workflow in one place.

Segmentary is an open-source, config-driven PyTorch suite for semantic segmentation. It supports Hugging Face, native, and Segmentation Models PyTorch architectures through the same training and evaluation interface. The current framework is focused on semantic and binary segmentation, with a roadmap toward a broader Hugging Face segmentation suite.

## What Segmentary Provides

A typical segmentation project needs more than a training loop. Segmentary brings the surrounding tools into one reproducible workflow:

- dataset and mask verification;
- explicit taxonomy mapping;
- pretrained model loading with pinned revisions;
- full fine-tuning, frozen backbones, and LoRA;
- single-stage and transfer-learning curricula;
- raw and EMA evaluation;
- native-resolution and sliding-window inference;
- detailed quality, speed, memory, and training-cost reports;
- safe checkpoint resume;
- and ONNX, ONNX Runtime, and TensorRT export for supported models.

Every result records the resolved configuration, Git revision, environment, checkpoint, evaluation settings, metrics, wall time, and memory use. This makes results easier to compare and much easier to reproduce later.

## A Simple Workflow

Segmentary starts with a small generated project:

~~~bash
segmentary-init my-project
cd my-project
~~~

Add your images and integer masks using a normal folder structure:

~~~text
data/
  images/train/frame_001.jpg
  masks/train/frame_001.png
  images/val/frame_101.jpg
  masks/val/frame_101.png
~~~

Before training, inspect the resolved configuration and verify the dataset:

~~~bash
segmentary-train base.yaml model.yaml experiment.yaml --print-config

segmentary-verify --dataset my_data --loader folder --root data \\
  --mapping my_data --space example --taxonomy taxonomy

segmentary-overfit base.yaml model.yaml experiment.yaml --images 8
~~~

The overfit check is intentional. If a model cannot learn eight images, it is better to find the data or model problem before committing hours of GPU time.

Once those checks pass, start the full run:

~~~bash
segmentary-train base.yaml model.yaml experiment.yaml --seed 0
~~~

## Using Hugging Face Models

Hugging Face models use the same experiment format as the rest of the catalog. A model configuration identifies the architecture, checkpoint, exact revision, tuning strategy, and model-specific parameter paths.

For example, a UPerNet model with a Swin-Tiny backbone can be declared as:

~~~yaml
model:
  arch: hf_auto
  checkpoint: openmmlab/upernet-swin-tiny
  revision: dc8e8c94669c6f14d5cc4c21a141daebd2280d59
  tuning: full
  backbone_path: backbone
  head_paths: [decode_head]
  classifier_path: decode_head.classifier

optim:
  backbone_lr: 6.0e-5
  llrd: 0.9
~~~

Segmentary then connects that model to the same dataset, loss, curriculum, checkpoint, evaluation, and reporting systems used by every other supported architecture.

The framework also validates more than a single forward pass. It checks output shapes, class counts, finite gradients, expected parameter updates, and pretrained-loading behavior. A model should not enter a long campaign until it satisfies the complete training contract.

## Explicit Data And Taxonomy Rules

Segmentation masks are not interchangeable just because they contain integers. Class ID 3 can mean different things across datasets. Some datasets omit classes, while others merge several labels into one target class.

Segmentary uses explicit taxonomies and dataset mappings to define those relationships. Per-sample active-class masks prevent training from penalizing a sample for classes its dataset does not label. Ignore regions remain ignored instead of silently becoming background.

This matters when adapting a public Hugging Face checkpoint to a private dataset. The model, source labels, and target labels must agree before the resulting metric has meaning.

## Training And Transfer Learning

Multi-stage training is represented directly in the configuration:

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

Segmentary validates the checkpoint handoff, preserves compatible learned tensors, and resets only declared incompatible task components. Interrupted runs can resume from the newest compatible periodic checkpoint. Completed source stages can be reused rather than trained again when only a target stage needs another attempt.

## Evaluation Beyond A Single Score

A final mIoU is useful, but it is not enough to choose a model.

Segmentary records per-class metrics, confusion matrices, boundary quality, pixel accuracy, inference speed, latency, parameter memory, checkpoint size, peak VRAM, training time, and GPU-hours. Evaluation settings such as sliding-window size, stride, TTA, and raw-versus-EMA weights are stored with the result.

For visual analysis, Segmentary can export a portable scene bundle containing the input image, ground truth, predictions, taxonomy, and provenance. The separate Inference Checker opens that bundle for overlays, side-by-side comparisons, pixel inspection, and model diffs.

## Tested Across Different Model Families

The completed Cityscapes and RailSem19 campaign covers 37 model recipes representing 36 unique physical models. It includes convolutional, transformer, query-based, Hugging Face, native, and SMP implementations under shared quality and performance protocols.

The campaign is not the product. It is evidence that the workflow works across different architectures and that the published comparisons come from consistent records.

## Where Segmentary Is Going

Segmentary already provides a strong semantic segmentation workflow. The next stage is deeper integration with the Hugging Face ecosystem:

- support for more Hub checkpoints and architecture families;
- Hub-aware model discovery and compatibility reports;
- generated fine-tuning recipes based on model and dataset metadata;
- publishing trained weights, model cards, configs, and evaluation evidence back to the Hub;
- broader export and deployment validation;
- complete multilabel workflows;
- and carefully designed support for instance, panoptic, video, depth-aware, and multimodal segmentation.

These are roadmap items, not claims about the current release. New capabilities will follow the same requirements for clear configuration, safe checkpoints, comparable evaluation, and reproducible evidence.

## Try Segmentary

Segmentary is available under the MIT license at [github.com/arianizadi/segmentary](https://github.com/arianizadi/segmentary).

Use the generated starter project for your own data, or begin with one of the supported Hugging Face models in the catalog. The repository includes installation guidance, tutorials, model references, transfer-learning examples, export documentation, and complete comparison records.

The goal is straightforward: make segmentation models easier to use from training through deployment, while keeping every result clear enough to trust.
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
