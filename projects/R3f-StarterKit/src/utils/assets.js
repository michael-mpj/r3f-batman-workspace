/**
 * Utility functions for loading and managing 3D assets
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export class AssetLoader {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
        this.loadedAssets = new Map();

        // Setup DRACO loader for compressed models
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        this.gltfLoader.setDRACOLoader(dracoLoader);
    }

    /**
   * Load GLTF/GLB model
   */
    async loadModel(url) {
        if (this.loadedAssets.has(url)) {
            return this.loadedAssets.get(url);
        }

        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                url,
                (gltf) => {
                    this.loadedAssets.set(url, gltf);
                    resolve(gltf);
                },
                (progress) => {
                    console.log(
                        'Loading progress:',
                        (progress.loaded / progress.total) * 100 + '%'
                    );
                },
                (error) => {
                    console.error('Error loading model:', error);
                    reject(error);
                }
            );
        });
    }

    /**
   * Load texture
   */
    async loadTexture(url) {
        if (this.loadedAssets.has(url)) {
            return this.loadedAssets.get(url);
        }

        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {
                    this.loadedAssets.set(url, texture);
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error('Error loading texture:', error);
                    reject(error);
                }
            );
        });
    }

    /**
   * Preload multiple assets
   */
    async preloadAssets(urls) {
        const promises = urls.map((url) => {
            if (url.endsWith('.gltf') || url.endsWith('.glb')) {
                return this.loadModel(url);
            } 
            return this.loadTexture(url);
      
        });

        return Promise.all(promises);
    }

    /**
   * Get loaded asset
   */
    getAsset(url) {
        return this.loadedAssets.get(url);
    }

    /**
   * Clear loaded assets to free memory
   */
    clearAssets() {
        this.loadedAssets.clear();
    }
}

export const assetLoader = new AssetLoader();

/**
 * Model utilities
 */
export const ModelUtils = {
    /**
   * Traverse and apply materials to all meshes in a scene/group
   */
    applyMaterialToModel: (object, material) => {
        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
    },

    /**
   * Scale model to fit within bounds
   */
    scaleModelToFit: (object, targetSize) => {
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = targetSize / maxDim;
        object.scale.setScalar(scale);
    },

    /**
   * Center model at origin
   */
    centerModel: (object) => {
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
    },
};
